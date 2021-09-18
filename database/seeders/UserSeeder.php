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
        $newUsers = [
            [
                'first_name' => 'Gordon',
                'last_name' => 'Freeman',
                'username' => 'admin',
                'email' => 'admin@vams.app',
                'password' => Hash::make('Fr33d0m!'),
                'roles' => [
                    'admin'
                ]
            ],
            [
                'first_name' => 'Mike',
                'last_name' => 'DeVita',
                'username' => 'ndboost',
                'email' => 'nd@ndboost.com',
                'password' => Hash::make('Freeb1rd04'),
                'roles' => [
                    'user',
                ]
            ],
            [
                'first_name' => 'Test',
                'last_name' => 'User',
                'username' => 'testuser',
                'email' => 'test@test.com',
                'password' => Hash::make('passw0rd'),
                'roles' => [
                    'user',
                ]
            ],
        ];

        foreach ($newUsers as $key => $newUser) {
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
}
