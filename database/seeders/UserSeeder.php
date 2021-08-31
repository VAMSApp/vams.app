<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
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
            'roles' => [
                'admin'
            ]
        ];

        $user = User::firstOrCreate([
            'username' => $newUser['username']
        ], [
            'first_name' => $newUser['first_name'],
            'last_name' => $newUser['last_name'],
            'username' => $newUser['username'],
            'email' => $newUser['email'],
            'password' => $newUser['password'],
        ]);

        $user->assignRole($newUser['roles']);

        $user->save();

    }
}
