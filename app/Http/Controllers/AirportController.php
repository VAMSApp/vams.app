<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Airport  $airport
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id, $airportCode)
    {
        $airport = Airport::with([
            'employees_home',
            'employees_home.company',
            'employees_home.status',
            'employees_home.certifications',
            'employees_home.certifications.aircraft_class',
            'employees_home.current_airport',
            'employees_current',
            'employees_current.company',
            'employees_current.status',
            'employees_current.certifications',
            'employees_current.certifications.aircraft_class',
            'employees_current.current_airport',

        ])
        ->where('id', $id)->first();

        return Inertia::render('Airport/Show', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => $airport->icao.' Details',
            'airport' => $airport,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Airport  $airport
     * @return \Illuminate\Http\Response
     */
    public function edit(Airport $airport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Airport  $airport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Airport $airport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Airport  $airport
     * @return \Illuminate\Http\Response
     */
    public function destroy(Airport $airport)
    {
        //
    }
}
