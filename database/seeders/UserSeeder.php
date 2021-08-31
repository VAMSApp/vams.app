<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newUser = [
            'first_name' => 'Gordon',
            'last_name' => 'Freeman',
            'username' => 'admin',
            'email' => 'admin@vams.app',
            'password' => Hash::make('passw0rd!'),
        ];

        User::updateOrCreate([
            'username' => $newUser['username']
        ], $newUser)->save();
    }
}
