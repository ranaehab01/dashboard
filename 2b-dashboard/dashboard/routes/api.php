<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/products', [ProductController::class, 'index'])
        ->middleware('permission:view products');

    Route::get('/products/{product}', [ProductController::class, 'show'])
        ->middleware('permission:view products');

    Route::post('/products', [ProductController::class, 'store'])
        ->middleware('permission:create products');

    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->middleware('permission:update products');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->middleware('permission:delete products');

    Route::delete('/product-images/{image}', [ProductController::class, 'destroyImage'])
        ->middleware('permission:update products');


    Route::get('/categories', [CategoryController::class, 'index'])
        ->middleware('permission:view categories');

    Route::get('/categories/{category}', [CategoryController::class, 'show'])
        ->middleware('permission:view categories');

    Route::post('/categories', [CategoryController::class, 'store'])
        ->middleware('permission:create categories');

    Route::put('/categories/{category}', [CategoryController::class, 'update'])
        ->middleware('permission:update categories');

    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])
        ->middleware('permission:delete categories');

    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:view users');

    Route::get('/users/{user}', [UserController::class, 'show'])
        ->middleware('permission:view users');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:create users');

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:update users');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:delete users');


    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:view roles');

    Route::get('/roles/{role}', [RoleController::class, 'show'])
        ->middleware('permission:view roles');

    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:create roles');

    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:update roles');
        
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:delete roles');

});