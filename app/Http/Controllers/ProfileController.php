<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        return Inertia::render('UserProfile', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Your Profile',
        ]);
    }
}
