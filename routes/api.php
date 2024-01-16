<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

Route::controller(UserController::class)->group(function () {
    #region User
    Route::get('/get-user',[AdminController::class,'get_user']);
    Route::get('/get-user-detail/{id}',[AdminController::class,'get_user_detail']);
    Route::post('/add-user',[AdminController::class,'add_user']);
    Route::post('/update-user/{id}',[AdminController::class,'update_user']);
    Route::post('/update-password',[AdminController::class,'update_password']);
    Route::post('/delete-user/{id}',[AdminController::class,'delete_user']);
    Route::post('/logout', [UserController::class, 'logout']);
    #endregion

    #region Product
    Route::post('/get-product',[AdminController::class,'get_product']);
    Route::get('/get-product-detail/{id}',[AdminController::class,'get_product_detail']);
    Route::post('/add-product',[AdminController::class,'add_product']);
    Route::post('/update-product/{id}',[AdminController::class,'update_product']);
    Route::post('/delete-product/{id}',[AdminController::class,'delete_product']);
    #endregion
    #region Table
    Route::post('/get-table',[AdminController::class,'get_table']);
    Route::get('/get-table-detail/{id}',[AdminController::class,'get_table_detail']);
    Route::post('/add-table',[AdminController::class,'add_table']);
    Route::post('/update-table/{id}',[AdminController::class,'update_table']);
    Route::post('/delete-table/{id}',[AdminController::class,'delete_table']);
    #endregion
    #region Order
    Route::get('/get-table-order',[OrderController::class,'get_table_order']);
    Route::post('/get-product-order',[OrderController::class,'get_product_order']);
    Route::get('/get-order-detail/{table_id}',[OrderController::class,'get_order_detail']);
    Route::post('/create-order',[OrderController::class,'create_order']);
    Route::post('/update-order',[OrderController::class,'update_order']);
    Route::post('/add-meal',[OrderController::class,'add_meal']);
    Route::post('/update-meal',[OrderController::class,'update_meal']);
    Route::post('/checkout',[OrderController::class,'checkout']);
    Route::post('/delete-meal',[OrderController::class,'delete_meal']);
    Route::post('/delete-table-order',[OrderController::class,'delete_table_order']);

    
    #endregion
});
Route::post('notify',[OrderController::class,'notify']);