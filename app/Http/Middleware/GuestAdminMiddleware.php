<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class GuestAdminMiddleware
{
    /**
     * Handle an incoming request that is not authenticated as a admin.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::guard('administrator')->check()) {
            return $next($request);
        }

        return redirect()->route('administrator.dashboard');
    }
}
