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
        $employee = new OnAirEmployee($response);

        return $employee;
    }

    public function updateOrCreate($input)
    {
        if (!isset($input)) {
            return false;
        }

        $translated = $this->translate($input);

        // if (!is_array($translated)) {
        //     $translated = (array) $translated;
        // }

        $company = Company::with(['world'])->where('uuid', $translated->company_uuid)->first();
        $category = EmployeeCategory::where('id', $translated->employee_category_id)->first();
        $status = EmployeeStatus::where('id', $translated->employee_status_id)->first();

        $homeAirport = Airport::updateOrCreate([
            'uuid' => $translated->home_airport_uuid
        ]);

        $translated->world_id = $company->world_id;
        $translated->company_id = $company->id;

        echo $translated->world_id."\n";
        $arr = (array) $translated;
        echo $arr['uuid'].' | '.$arr['employee_category_id'].' | '.$arr['world_id'];

        $employee = Employee::updateOrCreate([
            'uuid' => $arr['uuid']
        ], $arr);

        $employee
          ->company()->associate($company)
          ->world()->associate($company->world)
          ->category()->associate($category)
          ->status()->associate($status);

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

            if ($company) {
                $response = $this->query_details($company->world->slug, $company->api_key, $company->uuid)->translate($response);
            }

            return $company;

        } else {

            $companies = Company::with(['world'])->where('sync_employees', true)->get();
            $Companies = [];

            foreach ($companies as $key => $company) {
                $oa_employees = $this->query_details($company->world->slug, $company->api_key, $company->uuid);

                foreach ($oa_employees as $key => $oae) {
                    $res = $this->updateOrCreate($oae);
                }


                // if ($company->wasRecentlyCreated || $company->exists) {
                //     array_push($this->created, $company);
                // } else {
                //     array_push($this->updated, $company);
                // }
            }

            return $Companies;
        }
    }
}
