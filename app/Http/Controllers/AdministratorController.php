<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Administrator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
    public function logout(Request $request): RedirectResponse
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


    public function index(Request $request)
    {
        $search = $request->input('search');
        $message = $request->session()->get('message');

        $administrators = Administrator::with('role')
            ->when($search, function ($query, $search) {
                return $query->where('admin_name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('admin_id', 'like', '%' . $search . '%')
                    ->orWhereHas('role', function ($q) use ($search) {
                        $q->where('role_name', 'like', '%' . $search . '%');
                    });
            })
            ->paginate(10)
            ->appends(['search' => $search]); // Pass the search to pagination


        return Inertia::render('Administrator/Index', [
            'administrators' => $administrators,
            'search' => $search,
            'message' => $message,
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
        return redirect()->route('administrator.index')->with('message', ['success' => 'Administrator created successfully']);
    }

    public function edit(Administrator $administrator)
    {
        return Inertia::render('Administrator/Edit', [
            'admin_to_edit' => $administrator,
        ]);
    }

    public function update(Request $request, Administrator $administrator): RedirectResponse
    {
        $request->validate([
            'admin_name' => 'required',
            'email' => 'required|email|unique:administrators,email,' . $administrator->admin_id . ',admin_id',
            'role_id' => 'required|exists:roles,role_id',
        ]);

        $administrator->update($request->all());
        return redirect()->route('administrator.index')->with('message', ['success' => 'Administrator updated successfully']);
    }

    public function destroy(Administrator $administrator): RedirectResponse
    {

        $administrator->delete();
        return redirect()->route('administrator.index')->with('message', ['success' => 'Administrator deleted successfully']);
    }

    public function editPassword()
    {
        return Inertia::render('Administrator/Password');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $currentPassword = $request->input('current_password');
        $user = Auth::guard('administrator')->user();

        if (!Hash::check($currentPassword, $user->password)) {
            return back()->withErrors(['current_password' => 'The provided password does not match your current password.']);
        }
        $request->validate([
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ]);
        $request->validate([
            'password' => [Password::min(8)->uncompromised()->mixedCase()->letters()->numbers()->symbols()],
        ]);

        $administrator = Administrator::find($user->admin_id);
        $administrator->update([
            'password' => Hash::make($request->input('password')),
        ]);

        return back();
    }
}
