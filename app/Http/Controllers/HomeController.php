<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $sentVerifMessage = session('sentVerifMessage', false);
        $search = $request->input('search');
        if ($search) {
            $jobs = Job::with('jobType')
                ->where('job_name', 'like', '%' . $search . '%')
                ->where('date_expired', '>=', now())
                ->orWhereHas('jobType', function ($query) use ($search) {
                    $query->where('job_type_name', 'like', '%' . $search . '%');
                })
                ->orWhere('job_place', 'like', '%' . $search . '%')
                ->orWhere('min_rate_salary', 'like', '%' . $search . '%')
                ->orWhere('max_rate_salary', 'like', '%' . $search . '%')
                ->orWhere('min_experience', 'like', '%' . $search . '%')
                ->orWhere('job_desc', 'like', '%' . $search . '%')
                ->orWhere('date_listed', 'like', '%' . $search . '%')
                ->orWhere('date_expired', 'like', '%' . $search . '%')
                ->paginate(10)
                ->appends(['search' => $search]);

            if ($sentVerifMessage) {
                return Inertia::render('Homepage', [
                    'jobs' => $jobs,
                    'search' => $search,
                    'sentVerifMessage' => $sentVerifMessage,
                    'canResetPassword' => Route::has('password.request'),
                ]);
            }

            return Inertia::render('Homepage', [
                'jobs' => $jobs,
                'search' => $search,
                'canResetPassword' => Route::has('password.request'),
            ]);
        }

        $jobs = Job::with('jobType')
            ->where('date_expired', '>=', now())
            ->paginate(10);

        if ($sentVerifMessage) {
            return Inertia::render('Homepage', [
                'jobs' => $jobs,
                'sentVerifMessage' => $sentVerifMessage,
                'canResetPassword' => Route::has('password.request'),
            ]);
        }
        return Inertia::render('Homepage', [
            'jobs' => $jobs,
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function detaill(Job $job)
    {
        if($job->date_expired < now()){
            abort(404);
        }
        $job->load('jobType');
        return Inertia::render('Job/Jobdetail', [
            'job' => $job,
            'canResetPassword' => Route::has('password.request'),
        ]);
    }
}
