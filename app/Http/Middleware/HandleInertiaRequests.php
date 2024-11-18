<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $administrator = $request->user('administrator');
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'administrator' => [
                'user' => $administrator ? $administrator->load('role') : null,
            ],


        ];
    }
}
