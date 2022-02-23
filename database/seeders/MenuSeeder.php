<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\MenuItem;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $menus = [
            [
                'name' => 'Main Menu',
                'slug' => 'main-menu',
                'is_active' => true,
                'items' => [
                    [
                        'route_name' => 'home',
                        'permission_name' => 'home',
                        'label' => 'Home',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'company.index',
                        'permission_name' => 'company.index',
                        'label' => 'My Companies',
                        'is_active' => true,
                    ],
                ],
            ],
            [
                'name' => 'Admin Menu',
                'slug' => 'admin-menu',
                'is_active' => true,
                'items' => [
                    [
                        'route_name' => 'admin.users.index',
                        'permission_name' => 'admin.users.index',
                        'label' => 'Users',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'admin.role.index',
                        'permission_name' => 'admin.role.index',
                        'label' => 'Roles',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'admin.permission.index',
                        'permission_name' => 'admin.permission.index',
                        'label' => 'Permissions',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'admin.company.index',
                        'permission_name' => 'admin.company.index',
                        'label' => 'Companies',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'admin.menu.index',
                        'permission_name' => 'admin.menu.index',
                        'label' => 'Menus',
                        'is_active' => true,
                    ],
                ]
            ]
        ];

        foreach ($menus as $key => $m) {
            $Menu = Menu::updateOrCreate([
                'slug' => $m['slug']
            ], [
                'name' => $m['name'],
                'slug' => $m['slug'],
                'is_active' => $m['is_active'],
            ]);

            $items = $m['items'];


            foreach ($items as $key => $i) {
                $i['menu_id'] = $Menu->id;

                $item = MenuItem::updateOrCreate([
                    'route_name' => $i['route_name'],
                ], $i);
            }
        }
    }
}
