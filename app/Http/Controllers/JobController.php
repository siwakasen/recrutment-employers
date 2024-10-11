<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;


class JobController extends Controller
{


    public function index(Request $request)
    {
        $search = $request->input('search');
        $message = $request->session()->get('message');
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
            return Inertia::render('Job/Index', [
                'jobs' => $jobs,
                'search' => $search,
                'message' => $message,
            ]);
        }
        $jobs = Job::with('jobType')
            ->paginate(10);
        return Inertia::render('Job/Index', [
            'jobs' => $jobs,
            'message' => $message,
        ]);
    }

    public function create()
    {
        return Inertia::render('Job/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'job_type_id' => 'required|exists:job_types,job_type_id',
            'job_name' => 'required|unique:jobs,job_name|max:255',
            'min_rate_salary' => 'required|numeric|min:0',
            'max_rate_salary' => 'required|numeric|min:0',
            'min_experience' => 'required|numeric|min:0',
            'job_desc' => 'required',
            'job_place' => 'required|max:255',
            'requirement' => 'required|array',
            'responsibilities' => 'required|array',
            'date_listed' => 'required|date',
            'date_expired' => 'required|date|after:date_listed',
        ]);
        $request->merge([
            'requirement' => json_encode($request->input('requirement')),
            'responsibilities' => json_encode($request->input('responsibilities')),
        ]);
        Job::create($request->all());
        return redirect()->route('jobs.index')->with('message', ['success' => 'Job created successfully']);
    }

    public function destroy(Job $job): RedirectResponse
    {
        $job->delete();
        return redirect()->route('jobs.index')->with('message', ['success' => 'Job deleted successfully']);
    }

    public function edit(Job $job)
    {
        return Inertia::render('Job/Edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $request->validate([
            'job_type_id' => 'required|exists:job_types,job_type_id',
            'job_name' => 'required|max:255|unique:jobs,job_name,' . $job->job_id . ',job_id',
            'min_rate_salary' => 'required|numeric|min:0',
            'max_rate_salary' => 'required|numeric|min:0',
            'min_experience' => 'required|numeric|min:0',
            'job_desc' => 'required',
            'job_place' => 'required|max:255',
            'requirement' => 'required|array',
            'responsibilities' => 'required|array',
            'date_listed' => 'required|date',
            'date_expired' => 'required|date|after:date_listed',
        ]);
        $request->merge([
            'requirement' => json_encode($request->input('requirement')),
            'responsibilities' => json_encode($request->input('responsibilities')),
        ]);
        $job->update($request->all());
        return redirect()->route('jobs.index')->with('message', ['success' => 'Job updated successfully']);
    }
}
