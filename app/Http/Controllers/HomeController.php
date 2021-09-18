<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EnrollmentNotification;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $count = EnrollmentNotification::where('ip_address', $request->ip())->count();
        $isEnrolled = false;

        if (($count > 0) && (env('APP_ENV') == 'production')) {
            $isEnrolled = ($count > 0);
        }

        return Inertia::render('Home', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Home',
            'isEnrolled' => $isEnrolled,
        ]);
    }

    public function notification_enroll(Request $request)
    {

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|min:1|max:255'
        ]);

        $newEnrollNotification = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'ip_address' => $request->ip()
        ];

        $eN = EnrollmentNotification::create($newEnrollNotification);
        $eN->save();

        return response()->redirect('landing');
    }
}
