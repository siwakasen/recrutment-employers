<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Applicant;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function storeCv(Request $request): RedirectResponse
    {
        $request->validate([
            'curriculum_vitae' => ['required', 'file', 'mimes:pdf'],
        ]);
        if ($request->user()->curriculum_vitae) {
            $path = $request->user()->curriculum_vitae;
            $path = str_replace('/storage/', '', $path);
            unlink(storage_path('app/public/' . $path));
        }
        $path = $request->file('curriculum_vitae')->store('cvs', 'public');

        $request->user()->update([
            'curriculum_vitae' => '/storage/' . $path,
        ]);

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        if ($request->user()->curriculum_vitae) {
            $path = $request->user()->curriculum_vitae;
            $path = str_replace('/storage/', '', $path);
            unlink(storage_path('app/public/' . $path));
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
