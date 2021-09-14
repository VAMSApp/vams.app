<?php
namespace App\Services\OnAir;

use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use App\Services\OnAir\Models\OnAirEmployee;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\Employee;
use App\Models\EmployeeCategory;
use App\Models\EmployeeStatus;
use App\Models\World;
use App\Models\Airport;
use App\Models\OnAirRefresh;

class OnAirEmployeeService extends OnAirService {

    public function query_details($worldSlug, $api_key, $uuid)
    {
        $response = $this->ApiService->makeRequest($worldSlug, $api_key, '/company/'.$uuid.'/employees');
        return $response;
    }

    public function translate($response)
    {
        $translated;

        if (is_array($response)) {
            $translated = [];
            foreach ($response as $key => $r) {
                array_push($translated, new OnAirEmployee($response));
            }
        } else {
            $translated = new OnAirEmployee($response);
        }

        return $translated;
    }

    public function updateOrCreate($input)
    {
        if (!isset($input)) {
            return false;
        }

        $translated = (array) $this->translate($input);

        if (!is_array($translated)) {
            $translated = (array) $translated;
        }

        $employee = Employee::updateOrCreate([
            'uuid' => $translated['uuid']
        ], $translated);

        $employee->save();

        return $employee;
    }

    public function refresh($companyId = null)
    {

        if (isset($companyId)) {
            $company = Company::with(['world'])
                ->where('sync_employees', true)
                ->where('id', $companyId)
                ->first();

            dd($company);
            if ($company) {
                $response = $this->query_details($company->world->slug, $company->api_key, $company->uuid)->translate($response);
                dd($response);
            }

            return $company;

        } else {

            $companies = Company::with(['world'])->where('sync_company', true)->get();
            $Companies = [];

            foreach ($companies as $key => $company) {
                $response = $this->query_details($company->world->slug, $company->api_key, $company->uuid);
                $response = $this->translate($response);
                dd($response);

                // array_push($Companies, $company);
            }

            return $Companies;
        }
    }
}
