<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'appTitle' => env('APP_TITLE'),
        'pageTitle' => 'Dashboard'
    ]);
})->middleware(['auth', 'verified'])->name('home');


Route::prefix('/admin')
->middleware(['auth', 'verified', 'role:admin'])
->group(function () {


    Route::prefix('users')->group(function () {

        Route::get('/', [UserController::class, 'index'])
            ->name('users.index');

        Route::get('/show/{id}', [UserController::class, 'show'])
            ->name('users.show');

        Route::get('/edit/{id}', [UserController::class, 'edit'])
            ->name('users.edit');

        Route::patch('/edit/{id}', [UserController::class, 'update'])
            ->name('users.update');

        Route::get('/create', [UserController::class, 'create'])
            ->name('users.create');

        Route::post('/create', [UserController::class, 'store'])
            ->name('users.store');

        Route::patch('/{id}/remove_role', [UserController::class, 'remove_role'])
            ->name('users.remove_role');

    });




    Route::prefix('roles')->group(function() {

        Route::get('/', [RoleController::class, 'index'])
        ->name('roles.index');

        Route::get('/{id}', [RoleController::class, 'show'])
            ->name('roles.show');

        Route::get('/{id}/edit', [RoleController::class, 'edit'])
            ->name('roles.edit');

        Route::patch('/{id}/edit', [RoleController::class, 'update'])
            ->name('roles.update');

        Route::get('/create', [RoleController::class, 'create'])
            ->name('roles.create');

        Route::post('/create', [RoleController::class, 'store'])
            ->name('roles.store');

    });



    Route::prefix('permissions')->group(function() {

        Route::get('/', [PermissionController::class, 'index'])
        ->name('permissions.index');

        Route::get('/{id}', [PermissionController::class, 'show'])
            ->name('permissions.show');

        Route::get('/{id}/edit', [PermissionController::class, 'edit'])
            ->name('permissions.edit');

        Route::patch('/{id}/edit', [PermissionController::class, 'update'])
            ->name('permissions.update');

        Route::get('/create', [PermissionController::class, 'create'])
            ->name('permissions.create');

        Route::post('/create', [PermissionController::class, 'store'])
            ->name('permissions.store');
    });
});

require __DIR__.'/auth.php';
