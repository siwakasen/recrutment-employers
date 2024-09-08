<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Administrator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;


class AdministratorController extends Controller
{
    // Display the login view
    public function loginview()
    {
        return Inertia::render('Administrator/Login', [
            'status' => session('status'),
        ]);
    }

    // handle login request
    public function login(LoginRequest $request): RedirectResponse
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

    public function dashboard()
    {
        return Inertia::render('Administrator/Dashboard');
    }

    public function index()
    {
        $administrators = Administrator::with('role')->paginate(10);;
        return Inertia::render('Administrator/Index', [
            'administrators' => $administrators,
        ]);
    }
    public function create()
    {
        return Inertia::render('Administrator/Create');
    }
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'admin_name' => 'required',
            'email' => 'required|email|unique:administrators,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'role_id' => 'required|exists:roles,role_id',
        ]);

        $request->validate([
            'password' => [Password::min(8)->uncompromised()->mixedCase()->letters()->numbers()->symbols()],
        ]);

        Administrator::create($request->all());
        return redirect()->route('administrator.index');
    }
}
