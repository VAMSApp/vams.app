<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Menu;

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
        $menu = Menu::with(['menu_items'])->first();

        foreach ($menu->menu_items as $key => $item) {
            if ($user) {
                if (!$user->hasAnyRole(['admin', $item->role_name ])) {
                    unset($item);
                }
            }
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
            'menus' => [
                'mainMenu' => $menu
            ]
        ]);
    }
}
