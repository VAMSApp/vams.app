<?php
namespace App\Services\OnAir;

use App\Models\AircraftClass;
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
use App\Models\ClassCertification;
use App\Services\OnAir\Models\OnAirAirport;
use Illuminate\Support\Facades\Log;

class OnAirEmployeeService extends OnAirService {
    protected $created = [];
    protected $updated = [];

    public function query_details($api_key, $uuid)
    {
        $endPoint = "company/".$uuid."/employees";
        $response = $this->ApiService->makeRequest($api_key,  $endPoint);
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
        $employee_status_id = ($translated->employee_status_id) ? $translated->employee_status_id : 0;

        $company = Company::with(['world'])->where('uuid', $translated->company_uuid)->first();
        $category = EmployeeCategory::where('id', $translated->employee_category_id)->first();
        $status = EmployeeStatus::where('oa_id', $employee_status_id)->first();

        $homeAirport = Airport::updateOrCreate([
            'uuid' => $translated->home_airport_uuid
        ], (array) $translated->home_airport);

        $translated->world_id = $company->world_id;
        $translated->company_id = $company->id;
        $translated->home_airport_id = $homeAirport->id;


        if ($translated->current_airport) {
            $currentAirport = Airport::updateOrCreate([
                'uuid' => $translated->current_airport_uuid
            ], (array) $translated->current_airport);

            $translated->current_airport_id = $currentAirport->id;
        }

        if ($status) {
            $translated->employee_status_id = $status->id;
        }

        // echo $translated->world_id."\n";
        $arr = (array) $translated;

        echo "uuid: ".$arr['uuid'].' | employee_category_id: '.$arr['employee_category_id'].' | world_id: '.$arr['world_id'].' | employee_status_id: '.$arr['employee_status_id']."\n";

        // echo "pseudo: ".$arr['pseudo']."\n";
        // echo "flight_duty_start: ".$arr['flight_duty_start']."\n";

        $employee = Employee::updateOrCreate([
            'uuid' => $arr['uuid']
        ], $arr);

        $employee
            ->home_airport()->associate($homeAirport)
            ->company()->associate($company)
            ->world()->associate($company->world)
            ->category()->associate($category)
            ->status()->associate($status);

        if ($translated->class_certifications) {
            $certifications = [];

            foreach ($translated->class_certifications as $c) {

                $ac = AircraftClass::updateOrCreate([
                    'uuid' => $c->aircraft_class->uuid
                ], [
                    'uuid' => $c->aircraft_class->uuid,
                    'short_name' => $c->aircraft_class->short_name,
                    'name' => $c->aircraft_class->name,
                    'order' => $c->aircraft_class->order,
                ]);

                $cert = ClassCertification::updateOrCreate([
                    'uuid' => $c->uuid
                ], [
                    'uuid' => $c->uuid,
                    'people_uuid' => $employee->uuid,
                    'aircraft_class_uuid' => $ac->uuid,
                    'aircraft_class_id' => $ac->id,
                    'uuid' => $c->uuid,
                    'employee_id' => $employee->id,
                    'aircraft_class_id' => $ac->id,
                    'last_validation' => $c->last_validation,
                ]);

                array_push($certifications, $cert);
            }
        }

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
                $response = $this->query_details($company->api_key, $company->uuid);

                Log::debug("received ".count($response)." employee records. Looping through each.");

                foreach ($response as $oae) {
                    $res = $this->updateOrCreate($oae);

                    if ($res->wasRecentlyCreated) {
                        Log::debug("was recently created: $res->wasRecentlyCreated | exists: ".$res->exists);
                        array_push($this->created, $res);
                    } else if ($res->exists) {
                        array_push($this->updated, $res);
                    }
                }
            }

            return [
                'created' => $this->created,
                'updated' => $this->updated,
            ];

        } else {

            $companies = Company::with(['world'])->where('sync_employees', true)->get();
            $Companies = [];

            foreach ($companies as $key => $company) {
                $oa_employees = $this->query_details($company->api_key, $company->uuid);
                Log::debug("received ".count($oa_employees)." employee records. Looping through each.");

                foreach ($oa_employees as $oae) {
                    $res = $this->updateOrCreate($oae);
                    if ($res->wasRecentlyCreated) {
                        Log::debug("was recently created: $res->wasRecentlyCreated | exists: ".$res->exists);
                        array_push($this->created, $res);
                    } else if ($res->exists) {
                        array_push($this->updated, $res);
                    }
                }

                array_push($Companies, $company);
            }

            return [
                'created' => $this->created,
                'updated' => $this->updated,
            ];
        }
    }
}
