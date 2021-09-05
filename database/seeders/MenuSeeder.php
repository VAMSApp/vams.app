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
                        'route_name' => 'user.index',
                        'permission_name' => 'user.index',
                        'label' => 'Users',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'role.index',
                        'permission_name' => 'role.index',
                        'label' => 'Roles',
                        'is_active' => true,
                    ],
                    [
                        'route_name' => 'permission.index',
                        'permission_name' => 'permission.index',
                        'label' => 'Permissions',
                        'is_active' => true,
                    ],
                ]
            ]
        ];

        foreach ($menus as $key => $m) {
            $Menu = Menu::firstOrCreate([
                'slug' => $m['slug']
            ], [
                'name' => $m['name'],
                'slug' => $m['slug'],
                'is_active' => $m['is_active'],
            ]);

            $items = $m['items'];


            foreach ($items as $key => $i) {
                $i['menu_id'] = $Menu->id;

                $item = MenuItem::firstOrCreate([
                    'route_name' => $i['route_name'],
                ], $i);
            }
        }
    }
}
