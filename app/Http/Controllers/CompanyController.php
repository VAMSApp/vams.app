<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OnAir\OnAirCompanyService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\World;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        return Inertia::render('Company/List', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'My Companies',
            'companies' => $user->companies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $worlds = World::where('is_enabled', true)->get();

        return Inertia::render('Company/Create', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Add New Company',
            'worlds' => $worlds,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'uuid' => 'required|string|max:255',
            'api_key' => 'required|string|max:255',
            'world_slug' => 'required|string|min:1|max:255',
            'sync_company' => 'boolean',
            'sync_employees' => 'boolean',
            'sync_fbos' => 'boolean',
            'sync_fleet' => 'boolean',
            'sync_flights' => 'boolean',
            'sync_cashflow' => 'boolean',
        ]);

        $world = World::where('slug', $request->world_slug)->where('is_enabled', true)->first();

        $newCompany = [
            'uuid' => $request->uuid,
            'api_key' => $request->api_key,
            'world_id' => $world->id,
            'owner_id' => $user->id,
            'sync_company' => $request->sync_company,
            'sync_employees' => $request->sync_employees,
            'sync_fbos' => $request->sync_fbos,
            'sync_fleet' => $request->sync_fleet,
            'sync_flights' => $request->sync_flights,
            'sync_cashflow' => $request->sync_cashflow,
        ];

        $company = Company::create($newCompany);
        $company->owner()->associate($user);
        $company->world()->associate($world);


        if (!$user->hasRole('owner')) {
            $user->assignRole('owner');
        }

        $company->save();
        $user->save();
        return redirect()->route('company.show', $company->id);
    }

    public function request_company_details(OnAirCompanyService $companyService, Request $request)
    {
        $data = $request->json()->all();

        $world_slug = $data['world_slug'];
        $uuid = $data['uuid'];
        $api_key = $data['api_key'];

        $response = $companyService->query_details($world_slug, $api_key, $uuid);
        $translatedResponse = $companyService->translate($response);

        return response()->json($translatedResponse);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $company = Company::with(['world'])->where('id', $id)->where('owner_id', $user->id)->first();
        $worlds = World::where('is_enabled', true)->get();

        return Inertia::render('Company/Show', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Company Details',
            'company' => $company,
            'worlds' => $worlds,
        ]);
    }

    public function refresh(Request $request, OnAirCompanyService $companyService, $id)
    {
        $company = Company::where('id', $id)->where('owner_id', $request->user()->id)->first();
        $response;

        if ($company) {
            $response = $companyService->refresh($id);
        }

        return response()->json($response);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::with(['world'])->where('id', $id)->where('owner_id', $request->user()->id)->first();
        $worlds = World::where('is_enabled', true)->get();

        return Inertia::render('Company/Edit', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Editing Company',
            'company' => $company,
            'worlds' => $worlds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        //
    }
}
