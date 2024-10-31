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
}
