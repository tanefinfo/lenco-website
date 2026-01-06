<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutContentController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\FestivalController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TalentController;
use App\Http\Controllers\Api\TalentApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Api\ContentController;



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
    // READ: Get content by language, e.g., /api/about?lang=en
    Route::get('/', [AboutContentController::class, 'show']);

    // CREATE: Add a new content for a specific language
    Route::post('/', [AboutContentController::class, 'store']);

    // UPDATE: Update content for a specific language, e.g., /api/about/en
    Route::put('{lang}', [AboutContentController::class, 'update']);

    // DELETE: Delete content for a specific language, e.g., /api/about/en
    Route::delete('{lang}', [AboutContentController::class, 'destroy']);

    // BULK CREATE/UPDATE: Add or update multiple languages at once
    Route::post('/bulk', [AboutContentController::class, 'bulkStore']);
});



Route::prefix('awards')->group(function () {
    Route::get('/', [AwardController::class, 'index']);
    Route::get('/{id}', [AwardController::class, 'show']);
    Route::post('/', [AwardController::class, 'store']);
    Route::put('/{id}', [AwardController::class, 'update']);
    Route::delete('/{id}', [AwardController::class, 'destroy']);
});


Route::prefix('contact')->group(function () {
    Route::post('/', [ContactController::class, 'store']);
    Route::get('/', [ContactController::class, 'index']);
    Route::get('/{id}', [ContactController::class, 'show']);
    Route::put('/{id}', [ContactController::class, 'update']);
    Route::delete('/{id}', [ContactController::class, 'destroy']);
});

Route::get('/galleries', [GalleryController::class, 'index']);
Route::get('/galleries/{id}', [GalleryController::class, 'show']);
Route::post('/galleries', [GalleryController::class, 'store']);
Route::put('/galleries/{id}', [GalleryController::class, 'update']);
Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);


Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);




Route::prefix('festivals')->group(function () {
    Route::get('/', [FestivalController::class, 'index']);
    Route::get('/{id}', [FestivalController::class, 'show']);
    Route::post('/', [FestivalController::class, 'store']);
    Route::put('/{id}', [FestivalController::class, 'update']);
    Route::delete('/{id}', [FestivalController::class, 'destroy']);
});

// routes/api.php

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{service}', [ServiceController::class, 'update']);
Route::delete('/services/{service}', [ServiceController::class, 'destroy']);


Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/', [ProductController::class, 'store']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});

Route::prefix('talents')->group(function () {
    Route::get('/', [TalentController::class, 'index']);
    Route::get('{id}', [TalentController::class, 'show']);
    Route::post('/', [TalentController::class, 'store']);
    Route::put('{id}', [TalentController::class, 'update']);
    Route::delete('{id}', [TalentController::class, 'destroy']);

    Route::post('{id}/apply', [TalentApplicationController::class, 'store']);
});
Route::prefix('admin')->group(function () {
    Route::get('talent-applications', [TalentApplicationController::class, 'index']);
    Route::get('talent-applications/{id}', [TalentApplicationController::class, 'show']);
    Route::put('talent-applications/{id}/review', [TalentApplicationController::class, 'review']);
});


Route::get('/contents', [ContentController::class, 'index']);
Route::get('/contents/{type}/{slug}', [ContentController::class, 'show']);
Route::prefix('admin')->group(function () {
    Route::post('/contents', [ContentController::class, 'store']);
    Route::put('/contents/{id}', [ContentController::class, 'update']);
    Route::delete('/contents/{id}', [ContentController::class, 'destroy']);
});
