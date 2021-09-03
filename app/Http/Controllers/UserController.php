<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(['roles'])->get();
        $roles = Role::all();

        return Inertia::render('User/List', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'All Users',
            'users' => $users,
            'roles' => $roles,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $roles = Role::all();

        return Inertia::render('User/Create', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Create User',
            'roles' => $roles,
        ]);
    }

    public function remove_role(Request $request, $id)
    {
        $roleId = $request->json('roleId');
        $userId = $request->json('userId');
        dd([
            'roleId' => $roleId,
            'userId' => $userId,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|min:5|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $userRoles = $request->roles;

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->setRoles($userRoles);
        $user->save();

        return redirect('users.show', $user->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with(['roles'])->where('id', $id)->first();
        $roles = Role::all();

        return Inertia::render('User/Show', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Viewing ',
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::with(['roles'])->where('id', $id)->first();
        $roles = Role::all();

        return Inertia::render('User/Edit', [
            'appTitle' => env('APP_TITLE'),
            'pageTitle' => 'Editing '.$user->username,
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
