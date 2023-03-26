<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/products', [ProductController::class, 'getAll']);
Route::get('/product/{id}', [ProductController::class, 'getOne']);


Route::group(['middleware' => ['auth:sanctum']], function()
{
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/order', [OrderController::class, 'create']);

    Route::middleware('can:manage-products')->group(function()
    {
        Route::post('/product', [ProductController::class, 'create']);
        Route::patch('/product/{id}', [ProductController::class, 'update']);
        Route::delete('/product/{id}', [ProductController::class, 'delete']);
    });

    Route::middleware('can:manage-orders')->group(function()
    {
        Route::get('/orders', [OrderController::class, 'getAll']);
        Route::get('/assigned-orders', [OrderController::class, 'getAllAssigned']);
        Route::patch('/order/{id}/assign', [OrderController::class, 'assign']);
        Route::delete('/assigned-order/{id}', [OrderController::class, 'deleteAssigned']);
    });
});
