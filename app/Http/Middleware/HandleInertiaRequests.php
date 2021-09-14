<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Menu;
use App\Models\User;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        $user = $request->user();
        $isAdmin = false;
        $mainMenu = [];
        $adminMenu = [];

        if ($user) {

            $user = User::with(['roles', 'roles.permissions', 'permissions'])->where('id', $user->id)->first();
            $isAdmin = $user->hasRole('admin');

            $main_menu = Menu::with(['menu_items'])->where('is_active', true)->where('slug', 'main-menu')->first();
            $admin_menu = Menu::with(['menu_items'])->where('is_active', true)->where('slug', 'admin-menu')->first();

            if ($main_menu) {
                foreach ($main_menu->menu_items as $key => $item) {
                    if ($user->can($item->permission_name)) {
                        array_push($mainMenu, $item);
                    }
                }
            }

            if ($admin_menu) {
                foreach ($admin_menu->menu_items as $key => $item) {
                    if ($user->can($item->permission_name)) {
                        array_push($adminMenu, $item);
                    }
                }
            }
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'isAdmin' => $isAdmin,
            ],
            'menus' => [
                'mainMenu' => $mainMenu,
                'adminMenu' => $adminMenu
            ]
        ]);
    }
}
