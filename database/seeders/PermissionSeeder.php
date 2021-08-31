<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $roles = [
            [
                'name' => 'admin',
            ],
            [
                'name' => 'user',
            ],
        ];

        foreach ($roles as $key => $r) {
            $roleName = $r['name'];
            $permissions = (array_key_exists('permissions', $r)) ? $r['permissions'] : null;

            $role = Role::updateOrCreate([
                'name' => $roleName
            ], [ 'name' => $roleName ]);

            if (is_array($permissions)) {
                foreach ($permissions as $key => $p) {
                    $permissionName = $p['name'];

                    $permission = Permission::updateOrCreate([
                        'name' => $permissionName
                    ], [ 'name' => $permissionName ]);

                    $permission->assignRole($role);
                    $permission->save();
                }
            }

            $role->save();
            // $Role = Role::firstOrCreate([ 'name' => $role ], [ 'name' => $role ]);
            // echo "role_name: $Role->name\n";

            // if (is_array($role)) {
            //     foreach ($role as $permission) {
            //         $Permission = Permission::firstOrCreate([
            //             'name' => $permission
            //         ], [ 'name' => $permission]);

            //         $Permission->assignRole($Role);
            //         $Permission->save();
            //     }
            // }

            // $Role->save();
        }
    }
}
