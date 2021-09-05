<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\World;

class WorldSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $worlds = [
            [
                'name' => 'Thunder',
                'slug' => 'thunder',
                'uuid'   => 'c83eb5d5-9dc5-452f-b261-69b45cb0951b',
                'is_enabled' => true,
            ],
            [
                'name' => 'Stratus',
                'slug' => 'stratus',
                'uuid'   => 'be6ab20f-809f-4c57-aaa6-9e78a3022ba8',
                'is_enabled' => true,
            ],
            [
                'name' => 'Cumulus',
                'slug' => 'cumulus',
                'uuid'   => 'ad3ec8a4-246e-4abb-84a9-9dbc43bb6ae6',
                'is_enabled' => true,
            ],
            [
                'name' => 'Clear Sky',
                'slug' => 'clear-sky',
                'uuid'   => 'd72139d8-c66e-49a6-8af1-d259081b0e7c',
                'is_enabled' => true,
            ],
        ];

        $Worlds = [];

        foreach ($worlds as $key => $world) {
            $world = World::firstOrCreate($world);
            array_push($worlds, $world);
        }
    }
}
