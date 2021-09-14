<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\AdminCompanyController;
use App\Http\Controllers\Admin\AdminMenuController;

Route::prefix('/admin')
->middleware(['auth', 'verified', 'role:admin'])
->group(function () {

    Route::prefix('menu')->group(function() {

        Route::get('/', [AdminMenuController::class, 'index'])
            ->name('admin.menu.index');

        Route::get('/{id}', [AdminMenuController::class, 'show'])
            ->name('admin.menu.show');

        Route::get('/{id}/edit', [AdminMenuController::class, 'edit'])
            ->name('admin.menu.edit');

        Route::patch('/{id}/edit', [AdminMenuController::class, 'update'])
            ->name('admin.menu.create');

        Route::post('/{id}/change_active', [AdminMenuController::class, 'change_active'])
            ->name('admin.menu.change_active');

        Route::post('/{id}/menuitem_change_active', [AdminMenuController::class, 'menu_item_change_active'])
            ->name('admin.menu_item.change_active');

        Route::get('/create', [AdminMenuController::class, 'create'])
            ->name('admin.menu.create');

        Route::post('/create', [AdminMenuController::class, 'store'])
            ->name('admin.menu.create');

        Route::post('/{id}/create_menu_item', [AdminMenuController::class, 'store_menu_item'])
            ->name('admin.menu.create_menu_item');

        Route::delete('/{id}/delete_menu_item/{menuItemId}', [AdminMenuController::class, 'delete_menu_item'])
            ->name('admin.menu.delete_menu_item');
    });


    Route::prefix('user')->group(function () {

        Route::get('/', [UserController::class, 'index'])
            ->middleware(['permission:user.index'])
            ->name('admin.user.index');

        Route::get('/show/{id}', [UserController::class, 'show'])
            ->middleware(['permission:user.show'])
            ->name('admin.user.show');

        Route::get('/edit/{id}', [UserController::class, 'edit'])
            ->middleware(['permission:user.edit'])
            ->name('admin.user.edit');

        Route::patch('/edit/{id}', [UserController::class, 'update'])
            ->middleware(['permission:user.edit'])
            ->name('admin.user.edit');

        Route::get('/create', [UserController::class, 'create'])
            ->middleware(['permission:user.create'])
            ->name('admin.user.create');

        Route::post('/create', [UserController::class, 'store'])
            ->middleware(['permission:user.create'])
            ->name('admin.user.create');

        Route::patch('/{id}/remove_role', [UserController::class, 'remove_role'])
            ->middleware(['permission:user.remove_role'])
            ->name('admin.user.remove_role');

    });




    Route::prefix('role')->group(function() {

        Route::get('/', [RoleController::class, 'index'])
            ->middleware(['permission:role.index'])
            ->name('admin.role.index');

        Route::get('/{id}', [RoleController::class, 'show'])
            ->middleware(['permission:role.show'])
            ->name('admin.role.show');

        Route::get('/{id}/edit', [RoleController::class, 'edit'])
            ->middleware(['permission:role.edit'])
            ->name('admin.role.edit');

        Route::patch('/{id}/edit', [RoleController::class, 'update'])
            ->middleware(['permission:role.edit'])
            ->name('admin.role.edit');

        Route::get('/create', [RoleController::class, 'create'])
            ->middleware(['permission:role.create'])
            ->name('admin.role.create');

        Route::post('/create', [RoleController::class, 'store'])
            ->middleware(['permission:role.edit'])
            ->name('admin.role.create');

    });

    Route::prefix('permission')->group(function() {

        Route::get('/', [PermissionController::class, 'index'])
            ->middleware(['permission:permission.index'])
            ->name('admin.permission.index');

        Route::get('/{id}', [PermissionController::class, 'show'])
            ->middleware(['permission:permission.show'])
            ->name('admin.permission.show');

        Route::get('/{id}/edit', [PermissionController::class, 'edit'])
            ->middleware(['permission:permission.edit'])
            ->name('admin.permission.edit');

        Route::patch('/{id}/edit', [PermissionController::class, 'update'])
            ->middleware(['permission:permission.edit'])
            ->name('admin.permission.edit');

        Route::get('/create', [PermissionController::class, 'create'])
            ->middleware(['permission:permission.create'])
            ->name('admin.permission.create');

        Route::post('/create', [PermissionController::class, 'store'])
            ->middleware(['permission:permission.create'])
            ->name('admin.permission.create');
    });

    Route::prefix('/company')
        ->middleware(['auth', 'verified', 'role:admin' ])
        ->group(function () {
            Route::get('/', [AdminCompanyController::class, 'index'])
                ->name('admin.company.index');

            Route::get('/show/{id}', [AdminCompanyController::class, 'show'])
                ->name('admin.company.show');

            Route::get('/edit/{id}', [AdminCompanyController::class, 'edit'])
                ->name('admin.company.edit');

            Route::patch('/edit/{id}', [AdminCompanyController::class, 'update'])
                ->name('admin.company.edit');

            Route::get('/create', [AdminCompanyController::class, 'create'])
                ->name('admin.company.create');

            Route::post('/create', [AdminCompanyController::class, 'store'])
                ->name('admin.company.create');

            Route::post('/request_details', [AdminCompanyController::class, 'request_company_details'])
                ->name('admin.company.request_details');

            Route::delete('/delete/{id}', [AdminCompanyController::class, 'destroy'])
                ->name('admin.company.delete');

            Route::post('/refresh', [AdminCompanyController::class, 'refresh'])
                ->name('admin.company.refresh');

        });
});
