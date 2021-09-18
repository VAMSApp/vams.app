<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\HomeController;

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

Route::get('/', [HomeController::class, 'index'])->name('landing');
Route::post('/notify', [HomeController::class, 'notification_enroll'])->name('enroll.notification');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'appTitle' => env('APP_TITLE'),
        'pageTitle' => 'Dashboard'
    ]);
})->middleware(['auth', 'verified', 'permission:home'])->name('home');

Route::prefix('/company')
->middleware(['auth', 'verified', 'role:user|admin' ])
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

    Route::post('/refresh', [CompanyController::class, 'refresh'])
        ->middleware(['permission:company.refresh'])
        ->name('company.refresh');

});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
