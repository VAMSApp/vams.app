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

        $basePermissions = [
            'home',
        ];

        $companyCRUDPermissions = [
            'company.index',
            'company.show',
            'company.edit',
            'company.create',
            'company.delete',
        ];

        $userCRUDPermissions = [
            'user.index',
            'user.show',
            'user.edit',
            'user.create',
            'user.delete',
        ];

        $roleCRUDPermissions = [
            'role.index',
            'role.show',
            'role.edit',
            'role.create',
            'role.delete',
            'permission.index',
            'permission.show',
            'permission.edit',
            'permission.create',
            'permission.delete',
        ];

        $permissionCRUDPermissions = [
            'permission.index',
            'permission.show',
            'permission.edit',
            'permission.create',
            'permission.delete',
        ];


        $userPermissions = [
            'company.index',
            'company.create',
            'user.profile',
            'user.profile_edit',
            'user.change_password',
        ];

        $ownerPermissions = [
            'company.index',
            'company.show',
            'company.edit',
            'company.create',
            'company.delete',
            'company.refresh',
        ];

        $permissions = array_merge(
            $basePermissions,
            $companyCRUDPermissions,
            $userCRUDPermissions,
            $roleCRUDPermissions,
            $permissionCRUDPermissions,
            $userPermissions,
            $ownerPermissions,
        );

        $roles = [
            [
                'name' => 'admin',
                'permissions' => $permissions
            ],
            [
                'name' => 'user',
                'permissions' => array_merge($basePermissions, $userPermissions)
            ],
            [
                'name' => 'owner',
                'permissions' => $ownerPermissions
            ]
        ];

        foreach ($roles as $key => $r) {
            $roleName = $r['name'];
            $permissions = (array_key_exists('permissions', $r)) ? $r['permissions'] : null;

            $role = Role::updateOrCreate([
                'name' => $roleName
            ], [ 'name' => $roleName ]);

            if (is_array($permissions)) {
                foreach ($permissions as $p) {
                    $permissionName = $p;

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
