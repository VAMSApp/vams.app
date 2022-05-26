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

        $airportCRUDPermissions = [
            'airport.index', //  list all Airports
            'airport.show', // show a specific airport
            'airport.edit', // edit a specific airport
            'airport.create', // create an airport
            'airport.delete', // delete an airport
        ];

        $companyCRUDPermissions = [
            'company.index', // list all Companies
            'company.show', // show a single Permission by a given Company
            'company.edit', // edit a single Permission by a given Company
            'company.create', // create a new Company
            'company.delete', // delete a Company
        ];

        $userCRUDPermissions = [
            'user.index', // list all Users
            'user.show', // show a single Permission by a given User
            'user.edit', // edit a single Permission by a given User
            'user.create', // create a new User
            'user.delete', // delete a User
        ];

        $roleCRUDPermissions = [
            'role.index', // list all Roles
            'role.show', // show a single Permission by a given Role
            'role.edit', // edit a single Permission by a given Role
            'role.create', // create a new Role
            'role.delete', // delete a Role
        ];

        $permissionCRUDPermissions = [
            'permission.index', // list all Permissions
            'permission.show', // show a single Permission by a given id
            'permission.edit', // edit a single Permission by a given id
            'permission.create', // create a new Permission
            'permission.delete', // delete a Permission
        ];

        // what permissions the `user` role will have
        $userRolePermissions = [
            'company.index', // list all of the current users companies
            'company.create', // create a company
            'airport.index', // list all airports
            'airport.show', // show a single airport by a given id
            'user.profile', // show the current users profiles
            'user.profile_edit', // edit the current users profiles
            'user.change_password', // change the current users password
        ];

        // what permissions the `owner` role will have
        $ownerRolePermissions = [
            'company.index', // Show the companies the current user is an owner of
            'company.show', // show a single Company by a given id
            'company.edit', // edit a single Company by a given id
            'company.create', // create a new Company
            'company.delete', // delete a Company
            'company.refresh', // trigger an onair Company refresh
        ];

        $permissions = array_merge(
            $basePermissions,
            $companyCRUDPermissions,
            $airportCRUDPermissions,
            $userCRUDPermissions,
            $roleCRUDPermissions,
            $permissionCRUDPermissions,
            $userRolePermissions,
            $ownerRolePermissions,
        );

        $roles = [
            [
                'name' => 'admin',
                'permissions' => $permissions
            ],
            [
                'name' => 'user',
                'permissions' => array_merge($basePermissions, $userRolePermissions)
            ],
            [
                'name' => 'owner',
                'permissions' => $ownerRolePermissions
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
