<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Menu;

class MenuController extends Controller
{
    protected $Menu = [];

    public function load_menu()
    {
        $user = Auth::user();
        $menus = Menu::with(['menu_items'])->where('is_active', true)->get();
        $Menus = [];

        foreach ($menus as $key => $m) {
            foreach ($m->menu_items as $key => $item) {
                if ($user->hasAnyRole(['admin', $item->role_name ])) {
                    array_push($Menus, $item);
                }
            }
        }

        return response()->json($Menus);
    }
}
