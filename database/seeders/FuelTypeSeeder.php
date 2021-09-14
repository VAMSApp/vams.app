<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\FuelType;

class FuelTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fuelTypes = [
            [
                'id' => 0,
                'name' => '100LL',
            ],
            [
                'id' => 1,
                'name' => 'Jet',
            ]
        ];

        foreach ($fuelTypes as $key => $s) {
            $slug = Str::slug($s['name']);

            $status = FuelType::updateOrCreate([
                'slug' => $slug
            ], [
                'id' => $s['id'],
                'name' => $s['name'],
                'slug' => $slug
            ]);

        }
    }
}
