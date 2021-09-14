<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AircraftType;

class AircraftTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AircraftType::factory(1)->create();
    }
}
