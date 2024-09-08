<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdministratorController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('administrator')->group(function () {
    Route::middleware('administrator')->group(function () {
        Route::get('/dashboard', [AdministratorController::class, 'dashboard'])->name('administrator.dashboard');
        Route::post('/logout', [AdministratorController::class, 'logout'])->name('administrator.logout');
    });

    Route::middleware(['administrator', 'executive'])->group(function () {
        Route::get('/index', [AdministratorController::class, 'index'])->name('administrator.index');
        Route::get('/create', [AdministratorController::class, 'create'])->name('administrator.create');
        Route::post('/store', [AdministratorController::class, 'store'])->name('administrator.store');
        Route::delete('/{administrator}', [AdministratorController::class, 'destroy'])->name('administrator.destroy');
    });
});

require __DIR__ . '/auth.php';
