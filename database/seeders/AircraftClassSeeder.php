<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AircraftClass;

class AircraftClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AircraftClass::factory(1)->create();
    }
}
