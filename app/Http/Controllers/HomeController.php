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
            'simTypes' => [
                [
                    'value' => 'msfs2020',
                    'label' => 'MSFS 2020'
                ],
                [
                    'value' => 'fsx',
                    'label' => 'MS FS X'
                ],
                [
                    'value' => 'xplane11',
                    'label' => 'X-Plane 11'
                ],
                [
                    'value' => 'other',
                    'label' => 'Other, please specify in the comments'
                ],
            ]
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
            'ip_address' => $request->ip(),
            'sync_onair_company' => $request->sync_onair_company,
            'sync_onair_fleet' => $request->sync_onair_fleet,
            'sync_onair_employees' => $request->sync_onair_employees,
            'sync_onair_fbos' => $request->sync_onair_fbos,
            'sync_onair_cashflow' => $request->sync_onair_cashflow,
            'sim_type' => $request->sim_type,
            'comments' => $request->comments,
        ];

        $eN = EnrollmentNotification::create($newEnrollNotification);
        $eN->save();

        return redirect()->route('landing');
    }
}
