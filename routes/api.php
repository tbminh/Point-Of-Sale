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

// Route::middleware('auth:sanctum')->group(function () {
    Route::get('/get-product',[AdminController::class,'get_product']);
    Route::post('/add-product',[AdminController::class,'add_product']);
    Route::post('/update-product/{id}',[AdminController::class,'update_product']);
    Route::post('/delete-product/{id}',[AdminController::class,'delete_product']);
    Route::post('/logout', [UserController::class, 'logout']);
// });