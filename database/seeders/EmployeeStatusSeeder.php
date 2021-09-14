<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeeStatus;

class EmployeeStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            [
                'oa_id' => 0,
                'name' => 'Idle',
            ],
            [
                'oa_id' => 1,
                'name' => 'Resting',
            ],
            [
                'oa_id' => 2,
                'name' => 'Training',
            ],
            [
                'oa_id' => 3,
                'name' => 'Transporting',
            ],
            [
                'oa_id' => 5,
                'name' => 'Flying',
            ],
            [
                'oa_id' => 7,
                'name' => 'Ready',
            ],
            [
                'oa_id' => 8,
                'name' => 'Relocating',
            ],
            [
                'oa_id' => 1,
                'name' => 'Warp'
            ]
        ];

        foreach ($statuses as $key => $s) {
            $status = EmployeeStatus::updateOrCreate([
                'name' => $s['name']
            ], $s)->save();
        }
    }
}
