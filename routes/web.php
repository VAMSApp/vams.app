<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CompanyController;
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
})->middleware(['auth', 'verified', 'permission:home'])->name('home');


Route::prefix('/admin')
->middleware(['auth', 'verified', 'role:admin'])
->group(function () {

    Route::prefix('user')->group(function () {

        Route::get('/', [UserController::class, 'index'])
            ->middleware(['permission:user.index'])
            ->name('user.index');

        Route::get('/show/{id}', [UserController::class, 'show'])
            ->middleware(['permission:user.show'])
            ->name('user.show');

        Route::get('/edit/{id}', [UserController::class, 'edit'])
            ->middleware(['permission:user.edit'])
            ->name('user.edit');

        Route::patch('/edit/{id}', [UserController::class, 'update'])
            ->middleware(['permission:user.edit'])
            ->name('user.update');

        Route::get('/create', [UserController::class, 'create'])
            ->middleware(['permission:user.create'])
            ->name('user.create');

        Route::post('/create', [UserController::class, 'store'])
            ->middleware(['permission:user.create'])
            ->name('user.store');

        Route::patch('/{id}/remove_role', [UserController::class, 'remove_role'])
            ->middleware(['permission:user.remove_role'])
            ->name('user.remove_role');

    });




    Route::prefix('role')->group(function() {

        Route::get('/', [RoleController::class, 'index'])
            ->middleware(['permission:role.index'])
            ->name('role.index');

        Route::get('/{id}', [RoleController::class, 'show'])
            ->middleware(['permission:role.show'])
            ->name('role.show');

        Route::get('/{id}/edit', [RoleController::class, 'edit'])
            ->middleware(['permission:role.edit'])
            ->name('role.edit');

        Route::patch('/{id}/edit', [RoleController::class, 'update'])
            ->middleware(['permission:role.edit'])
            ->name('role.update');

        Route::get('/create', [RoleController::class, 'create'])
            ->middleware(['permission:role.create'])
            ->name('role.create');

        Route::post('/create', [RoleController::class, 'store'])
            ->middleware(['permission:role.edit'])
            ->name('role.store');

    });



    Route::prefix('permission')->group(function() {

        Route::get('/', [PermissionController::class, 'index'])
            ->middleware(['permission:permission.index'])
            ->name('permission.index');

        Route::get('/{id}', [PermissionController::class, 'show'])
            ->middleware(['permission:permission.show'])
            ->name('permission.show');

        Route::get('/{id}/edit', [PermissionController::class, 'edit'])
            ->middleware(['permission:permission.edit'])
            ->name('permission.edit');

        Route::patch('/{id}/edit', [PermissionController::class, 'update'])
            ->middleware(['permission:permission.edit'])
            ->name('permission.update');

        Route::get('/create', [PermissionController::class, 'create'])
            ->middleware(['permission:permission.create'])
            ->name('permission.create');

        Route::post('/create', [PermissionController::class, 'store'])
            ->middleware(['permission:permission.create'])
            ->name('permission.store');
    });
});


Route::prefix('/company')
->middleware(['auth', 'verified', 'role:user' ])
->group(function () {
    Route::get('/', [CompanyController::class, 'index'])
        ->middleware(['permission:company.index'])
        ->name('company.index');

    Route::get('/show/{id}', [CompanyController::class, 'show'])
        ->middleware(['permission:company.show'])
        ->name('company.show');

    Route::get('/edit/{id}', [CompanyController::class, 'edit'])
        ->middleware(['permission:company.edit'])
        ->name('company.edit');

    Route::patch('/edit/{id}', [CompanyController::class, 'update'])
        ->middleware(['permission:company.edit'])
        ->name('company.update');

    Route::get('/create', [CompanyController::class, 'create'])
        ->middleware(['permission:company.create'])
        ->name('company.create');

    Route::post('/create', [CompanyController::class, 'store'])
        ->middleware(['permission:company.create'])
        ->name('company.store');

    Route::post('/request_details', [CompanyController::class, 'request_company_details'])
        ->middleware(['permission:company.create'])
        ->name('company.request_details');

    Route::delete('/delete/{id}', [CompanyController::class, 'destroy'])
        ->middleware(['permission:company.delete'])
        ->name('company.delete');

    Route::post('/refresh/{id}', [CompanyController::class, 'refresh'])
        ->middleware(['permission:company.refresh'])
        ->name('company.refresh');

});
require __DIR__.'/auth.php';
