<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeeCategory;

class EmployeeCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Pilot',
            ],
            [
                'id' => 2,
                'name' => 'CabinCrew',
            ],
            [
                'id' => 3,
                'name' => 'Mechanic'
            ],
        ];

        foreach ($categories as $key => $c) {
            $category = EmployeeCategory::updateOrCreate([
                'name' => $c['name']
            ], $c)->save();
        }
    }
}
