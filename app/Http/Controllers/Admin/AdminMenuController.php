<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $menus = Menu::with(['menu_items'])->get();

        return Inertia::render('Menu/List', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Menus',
            '_menus' => $menus,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store_menu_item(Request $request, $id)
    {
        $menu = Menu::with(['menu_items'])->where('id', $id)->first();
        $error = null;

        $request->validate([
            'label' => 'required|string|max:255',
            'permission_name' => 'required|string|max:255',
            'route_name' => 'required|string|min:1|max:255',
            'menu_id' => 'required',
            'is_active' => 'required',
        ]);

        $route_name = $request->route_name;

        if ($this->check_route($route_name)) {
            $newMenuItem = [
                'label' => $request->label,
                'permission_name' => $request->permission_name,
                'route_name' => $request->route_name,
                'menu_id' => $request->menu_id,
                'is_active' => $request->is_active,
            ];

            $menuItem = MenuItem::create($newMenuItem);
            $menuItem->menu()->associate($menu);

            $menuItem->save();
        } else {
            $error = 'Route does not exist';
        }

        return redirect()->route('admin.menu.show', $menu->id)->with('error', $error);
    }

    public function delete_menu_item ($id, $menuItemId)
    {
        $error = null;
        $menu = Menu::with(['menu_items'])->where('id', $id)->first();
        $destroyed = MenuItem::destroy($menuItemId);

        return redirect()->route('admin.menu.show', $menu->id)->with('error', $error);
    }

    private function check_route($route)
    {
        if($route[0] === "/"){
            $route = substr($route, 1);
        }
        $routes = Route::getRoutes()->getRoutes();

        foreach ($routes as $r) {
            /** @var \Route $r */
            if ($r->uri == $route) {
                return true;
            }
            if (isset($r->action['as'])) {
                if ($r->action['as'] == $route) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $menu = Menu::with(['menu_items'])->where('id', $id)->first();
        return Inertia::render('Menu/Show', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => $menu->name.' Details',
            'menu' => $menu->toArray(),
        ]);
    }

    public function change_active(Request $request, $id)
    {
        $menu = Menu::where('id', $id)->first();
        dd($request->route()->getName());

        if ($menu) {
            $menu->is_active = !$menu->is_active;
            $menu->save();
        }

        return redirect()->route('admin.menu.index');

    }

    public function menu_item_change_active(Request $request, $id)
    {
        $menu_item = MenuItem::where('id', $id)->first();

        if ($menu_item) {
            $menu_item->is_active = !$menu_item->is_active;
            $menu_item->save();
        }

        return redirect()->route('admin.menu.show', $menu_item->menu_id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        //
    }
}
