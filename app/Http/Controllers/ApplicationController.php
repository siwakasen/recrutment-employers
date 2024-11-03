<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;

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
    public function update(Request $request, Application $application): RedirectResponse
    {
        $request->validate([
            'status' => 'required| in:rejected, interview, offered, hired',
        ]);

        $application->update($request->only('status'));

        return redirect()->back();
    }


    public function acceptByExecutive(Request $request, Application $application): RedirectResponse
    {
        $application->update(['status' => 'accepted']);

        return redirect()->back();
    }
}
