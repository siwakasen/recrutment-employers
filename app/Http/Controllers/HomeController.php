<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;


class HomeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $jobs = Job::with('jobType')
                ->where('job_name', 'like', '%' . $search . '%')
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
            return Inertia::render('Homepage', [
                'jobs' => $jobs,
                'search' => $search,
            ]);
        }
        $jobs = Job::with('jobType')
            ->paginate(10);
        return Inertia::render('Homepage', [
            'jobs' => $jobs,
        ]);
    }

    public function detaill(Job $job)
    {
        return Inertia::render('Job/Jobdetail', [
            'job' => $job,
        ]);
    }
}
