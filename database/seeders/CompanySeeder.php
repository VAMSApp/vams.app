<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = [
            'uuid' => 'f4aef1fe-9403-451d-baf5-dcf40a8ee40b',
            'world_id' => 2,
            'owner_id' => 2,
            'api_key' => 'c538b659-1eba-4b1b-9231-4385226b7c3a',
            'sync_company' => true,
            'sync_employees' => true,
        ];

        Company::firstOrCreate($company);
    }
}
