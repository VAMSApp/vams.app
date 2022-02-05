<?php
namespace App\Services\OnAir;

use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use App\Services\OnAir\Models\OnAirCompany;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\OnAirRefresh;

class OnAirCompanyService extends OnAirService {
    protected $created = [];
    protected $updated = [];

    public function query_details($api_key, $uuid)
    {
        $response = $this->ApiService->makeRequest($api_key, '/company/'.$uuid);
        return $response;
    }

    public function translate($response)
    {
        $translated = new OnAirCompany($response);
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

        $company = Company::updateOrCreate([
            'uuid' => $translated['uuid']
        ], $translated);

        $refresh = OnAirRefresh::create([
            'company_id' => $company->id
        ]);

        $refresh->company()->associate($company);

        $company->save();
        $refresh->save();

        return $company;
    }

    public function refresh($companyId = null)
    {

        if (isset($companyId)) {
            $company = Company::with(['world'])
                ->where('sync_company', true)
                ->where('id', $companyId)
                ->first();

            $newCompany = $this->query_details($company->api_key, $company->uuid);
            $company = $this->updateOrCreate($newCompany);

            return $company;

        } else {

            $companies = Company::with(['world'])->where('sync_company', true)->get();

            foreach ($companies as $key => $company) {
                $newCompany = $this->query_details($company->api_key, $company->uuid);
                $company = $this->updateOrCreate($newCompany);

                if ($company->wasRecentlyCreated || $company->exists) {
                    array_push($this->created, $company);
                } else {
                    array_push($this->updated, $company);
                }
            }

            return [
                'created' => $this->created,
                'updated' => $this->updated,
            ];
        }
    }
}
