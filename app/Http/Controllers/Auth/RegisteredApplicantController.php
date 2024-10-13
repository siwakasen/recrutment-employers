<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Applicant;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredApplicantController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'applicant_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Applicant::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Applicant::create([
            'applicant_name' => $request->applicant_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);
        session()->flash('sentVerifMessage', true);
        return redirect(route('home.index', absolute: false));
    }
}
