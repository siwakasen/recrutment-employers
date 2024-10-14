<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\HomeController;

// Route::get('/', function () {
// return Inertia::render('Welcome', [
//     'canLogin' => Route::has('login'),
//     'canRegister' => Route::has('register'),
//     'laravelVersion' => Application::VERSION,
//     'phpVersion' => PHP_VERSION,
// ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/jobs/{job}', [HomeController::class, 'detaill'])->name('jobs.detail');


// ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/cv', [ProfileController::class, 'storeCv'])->name('profile.cv.store');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('administrator')->group(function () {
    Route::middleware('administrator')->group(function () {
        Route::get('/dashboard', [AdministratorController::class, 'dashboard'])->name('administrator.dashboard');
        Route::post('/logout', [AdministratorController::class, 'logout'])->name('administrator.logout');
        Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
        Route::get('/change-password', [AdministratorController::class, 'editPassword'])->name('administrator.password.edit');
        Route::patch('/password/update', [AdministratorController::class, 'updatePassword'])->name('administrator.password.update');

        Route::middleware('executive')->group(function () {
            Route::get('/index', [AdministratorController::class, 'index'])->name('administrator.index');
            Route::get('/create', [AdministratorController::class, 'create'])->name('administrator.create');
            Route::post('/store', [AdministratorController::class, 'store'])->name('administrator.store');
            Route::delete('/{administrator}', [AdministratorController::class, 'destroy'])->name('administrator.destroy');
            Route::get('/{administrator}/edit', [AdministratorController::class, 'edit'])->name('administrator.edit');
            Route::patch('/{administrator}', [AdministratorController::class, 'update'])->name('administrator.update');
            Route::get('/search', [AdministratorController::class, 'search'])->name('administrator.search');
        });

        Route::middleware('hr')->group(function () {
            Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
            Route::post('/jobs/store', [JobController::class, 'store'])->name('jobs.store');
            Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
            Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
            Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
        });
    });
});

require __DIR__ . '/auth.php';
