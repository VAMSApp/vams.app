<?php
namespace App\Services\OnAir;

use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use App\Models\Company;
use App\Services\OnAir\Models\OnAirCompany;

class OnAirCompanyService extends OnAirService {

    public function query_details($worldSlug, $api_key, $uuid)
    {
        $response = $this->ApiService->makeRequest($worldSlug, $api_key, '/company/'.$uuid);
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

        $company->save();

        return $company;
    }

    public function refresh($companyId)
    {

        if (isset($companyId)) {
            $company = Company::with(['world'])
                ->where('sync_company', true)
                ->where('id', $companyId)
                ->first();

            $newCompany = $this->query_details($company->world->slug, $company->api_key, $company->uuid);
            $company = $this->updateOrCreate($newCompany);

            return $company;

        } else {

            $companies = Company::with(['world'])->where('sync_company', true)->get();
            $Companies = [];

            foreach ($companies as $key => $company) {
                $newCompany = $this->query_details($company->world->slug, $company->api_key, $company->uuid);
                $company = $this->updateOrCreate($newCompany);
                array_push($Companies, $company);
            }

            return $Companies;
        }
    }
}
