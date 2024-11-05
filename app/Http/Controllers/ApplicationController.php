<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use App\Mail\InterviewEmail;
use App\Mail\AnnouncementEmail;
use App\Mail\OfferingEmail;
use App\Mail\RejectedMail;

class ApplicationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'job_id' => 'required|exists:jobs,job_id',
            'applicant_id' => 'required|exists:applicants,applicant_id',
            'status' => 'required| in:waiting_approval',
        ]);

        Application::create($request->all());

        return redirect()->back();
    }

    public function cancelApplications(Request $request, Application $application): RedirectResponse
    {
        $application->update(['status' => 'cancelled']);
        return redirect()->back();
    }

    public function uploadEmploymentContract(Request $request, Application $application): RedirectResponse
    {
        $request->validate([
            'employment_contract' => ['required', 'file', 'mimes:pdf'],
        ]);
        if($application->employment_contract) {
            $path = $application->employment_contract;
            $path = str_replace('/storage/', '', $path);
            unlink(storage_path('app/public/' . $path));
        }
        $path = $request->file('employment_contract')->store('contracts', 'public');

        $application->update([
            'employment_contract' => '/storage/' . $path,
        ]);

        return redirect()->back();
    }


    public function show(Request $request)
    {
        $user = $request->user();
        $search = $request->input('search');
        if($search) {
            $applications = Application::with(['job' => function ($query) {
                $query->with('jobType');
            }])
                ->where('applicant_id', $user->applicant_id)
                ->whereHas('job', function ($query) use ($search) {
                    $query->where('job_name', 'like', '%' . $search . '%');
                })
                ->paginate(10)
                ->appends(['search' => $search]);
            return Inertia::render('Applications/Index', [
                'applications' => $applications,
                'search' => $search,
            ]);
        }
        $applications = Application::with(['job' => function ($query) {
            $query->with('jobType');
        }])
            ->where('applicant_id', $user->applicant_id)
            ->paginate(10);
        
        return Inertia::render('Applications/Index', [
            'applications' => $applications,
        ]);
    }
    
    // for administrators
    public function showAll(Request $request)
    {
        $search = $request->input('search');
        if($search) {
            $applications = Application::with(['job' => function ($query) {
                $query->with('jobType');
            }, 'applicant'])
                ->whereHas('job', function ($query) use ($search) {
                    $query->where('job_name', 'like', '%' . $search . '%');
                })
                ->orWhereHas('applicant', function ($query) use ($search) {
                    $query->where('applicant_name', 'like', '%' . $search . '%');
                })
                ->paginate(10)
                ->appends(['search' => $search]);
            return Inertia::render('Administrator/Applications/Index', [
                'applications' => $applications,
                'search' => $search,
            ]);
        }
        $applications = Application::with(['job' => function ($query) {
            $query->with('jobType');
        },'applicant'])
            ->paginate(10);
        
        return Inertia::render('Administrator/Applications/Index', [
            'applications' => $applications,
        ]);
    }

    
    
    public function update(Request $request, Application $application): RedirectResponse
    {
        $request->validate([
            'status' => "required|in:rejected,interview,offered,hired",
        ]);
        
        if($request->status === 'interview') {
            $request->validate([
                'interview_link' => 'required|url',
            ]);
            // send link to email if status is interview
            $details = [
                'subject' => 'Interview Invitation',
                'message' => 'You have been invited for an interview. Click the link below to join the interview',
                'applicant_name' => $application->applicant->applicant_name,
                'position' => $application->job->job_name,
                'interview_link' => $request->interview_link,
            ];
            try {
                Mail::to($application->applicant->email)->send(new InterviewEmail($details));
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to send email');
            }
            
        }
        
        if($request->status === 'hired') {
            // send announcement to email
            $details = [
                'subject' => 'Job Offer',
                'message' => 'Congratulations! You have been hired for the position of ' . $application->job->job_name,
                'applicant_name' => $application->applicant->applicant_name,
                'position' => $application->job->job_name,
            ];
            try {
                Mail::to($application->applicant->email)->send(new AnnouncementEmail($details));
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to send email');
            }
        }
        if($request->status === 'rejected'){
            $details = [
                'subject' => 'Rejected Mail',
                'message' => 'We regret to inform you that your application has been rejected',
                'applicant_name' => $application->applicant->applicant_name,
                'position' => $application->job->job_name,
            ];
            try {
                Mail::to($application->applicant->email)->send(new RejectedMail($details));
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to send email');
            }
        }
        
        $application->update($request->only('status'));
        
        return redirect()->back();
    }

    public function updateWithContract(Request $request, Application $application): RedirectResponse
    {
        $request->validate([
            'status' => "required|in:offered",
            'employment_contract' => ['required', 'file'],
        ]);
        // send file to email
        $details = [
            'subject' => 'Employment Contract',
            'message' => 'Congratulations! You have been offered for the position of ' . $application->job->job_name . 
                '. Please fill the attached employment contract and send it back to us.',
            'applicant_name' => $application->applicant->applicant_name,
            'employment_contract' => $request->file('employment_contract'),
            'position' => $application->job->job_name,
        ];

        try {
            Mail::to($application->applicant->email)->send(new OfferingEmail($details));
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to send email');
        }

        $application->update($request->only('status'));

        return redirect()->back();
    }



    public function acceptByExecutive(Request $request, Application $application): RedirectResponse
    {
        $request->validate([
            'status' => "required|in:accepted,rejected",
        ]);  
        if($request->status === 'rejected'){
            $details = [
                'subject' => 'Rejected Mail',
                'message' => 'We regret to inform you that your application has been rejected',
                'applicant_name' => $application->applicant->applicant_name,
                'position' => $application->job->job_name,
            ];
            try {
                Mail::to($application->applicant->email)->send(new RejectedMail($details));
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to send email');
            }
        }
        
        $application->update($request->only('status'));

        return redirect()->back();
    }
}
