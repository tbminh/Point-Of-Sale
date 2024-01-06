<?php

use App\Http\Controllers\AdminController;
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
    Route::post('/add-user',[AdminController::class,'add_user']);
    Route::post('/update-user/{id}',[AdminController::class,'update_user']);
    Route::post('/delete-product/{id}',[AdminController::class,'delete_user']);
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
    Route::post('/add-table',[AdminController::class,'add_table']);
    Route::post('/update-table/{id}',[AdminController::class,'update_table']);
    Route::post('/delete-table/{id}',[AdminController::class,'delete_table']);
    #endregion
});