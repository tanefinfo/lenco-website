<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (\Illuminate\Http\Request $request) {
        return $request->user();
    });

    Route::middleware('auth:sanctum')
    ->get('/dashboard', fn () => response()->json(['status' => 'ok']));

    Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
    Route::middleware('auth:sanctum')->post('/users', [UserController::class, 'store']);
    Route::middleware('auth:sanctum')->put('/users/{user}', [UserController::class, 'update']);
    Route::middleware('auth:sanctum')->delete('/users/{user}', [UserController::class, 'destroy']);

    // Roles
    Route::middleware('auth:sanctum')->get('/roles', [RoleController::class, 'index']);
    Route::middleware('auth:sanctum')->post('/roles', [RoleController::class, 'store']);
    Route::middleware('auth:sanctum')->put('/roles/{role}', [RoleController::class, 'update']);
    Route::middleware('auth:sanctum')->get('/permissions', [RoleController::class, 'permissions']);
});
