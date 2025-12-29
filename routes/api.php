<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutContentController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\AwardController;

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

Route::prefix('about')->group(function () {
    Route::get('/', [AboutContentController::class, 'show']);       // READ
    Route::post('/', [AboutContentController::class, 'store']);     // CREATE
    Route::put('{lang}', [AboutContentController::class, 'update']); // UPDATE
    Route::delete('{lang}', [AboutContentController::class, 'destroy']); // DELETE
    Route::post('/bulk', [AboutContentController::class, 'bulkStore']);

});

Route::prefix('contents')->group(function () {
    Route::get('/', [ContentController::class, 'index']);
    Route::get('{type}/{slug}', [ContentController::class, 'show']);
    Route::post('/', [ContentController::class, 'store']);
    Route::put('{id}', [ContentController::class, 'update']);
    Route::delete('{id}', [ContentController::class, 'destroy']);
});

Route::prefix('awards')->group(function () {
    Route::get('/', [AwardController::class, 'index']);
    Route::get('/{id}', [AwardController::class, 'show']);
    Route::post('/', [AwardController::class, 'store']);
    Route::put('/{id}', [AwardController::class, 'update']);
    Route::delete('/{id}', [AwardController::class, 'destroy']);
});


