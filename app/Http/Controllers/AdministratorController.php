<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdministratorController extends Controller
{
    // Display the login view
    public function create()
    {
        return Inertia::render('Administrator/Login', [
            'status' => session('status'),
        ]);
    }

    // handle login request
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        return redirect()->route('administrator.dashboard');
    }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('administrator')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('administrator.login');
    }
}
