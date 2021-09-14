<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            // PermissionSeeder::class,
            // UserSeeder::class,
            MenuSeeder::class,
            WorldSeeder::class,
            // EmployeeCategorySeeder::class,
            // EmployeeStatusSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            AircraftStatusSeeder::class,
            EmployeeStatusSeeder::class,
            EmployeeCategorySeeder::class,
            FuelTypeSeeder::class,
        ]);
    }
}
