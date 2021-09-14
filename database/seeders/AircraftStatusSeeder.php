<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\AircraftStatus;

class AircraftStatusSeeder extends Seeder
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
                'id' => 0,
                'name' => 'Idle',
            ],
            [
                'id' => 1,
                'name' => 'Maintenance',
            ],
            [
                'id' => 2,
                'name' => 'ApronWork',
            ],
            [
                'id' => 3,
                'name' => 'InFlight',
            ],
            [
                'id' => 4,
                'name' => 'Warp',
            ],
            [
                'id' => 5,
                'name' => 'Ferr',
            ]
        ];

        foreach ($statuses as $key => $s) {
            $slug = Str::slug($s['name']);

            $status = AircraftStatus::updateOrCreate([
                'slug' => $slug
            ], [
                'id' => $s['id'],
                'name' => $s['name'],
                'slug' => $slug
            ]);

        }
    }
}
