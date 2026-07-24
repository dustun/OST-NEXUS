<?php

declare(strict_types=1);

use App\Catalog\Presentation\Http\Controllers\Api\V1\CollectionController;
use App\Catalog\Presentation\Http\Controllers\Api\V1\ComposerController;
use App\Catalog\Presentation\Http\Controllers\Api\V1\GameController;
use App\Catalog\Presentation\Http\Controllers\Api\V1\HealthController;
use App\Catalog\Presentation\Http\Controllers\Api\V1\MoodController;
use App\Catalog\Presentation\Http\Controllers\Api\V1\SceneTypeController;
use App\Catalog\Presentation\Http\Controllers\Api\V1\TrackController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', HealthController::class)->name('api.v1.health');

    Route::get('/collections', [CollectionController::class, 'index'])->name('api.v1.collections.index');
    Route::get('/collections/{id}', [CollectionController::class, 'show'])->name('api.v1.collections.show');
    Route::get('/collections/{id}/items', [CollectionController::class, 'items'])->name('api.v1.collections.items');

    Route::get('/composers', [ComposerController::class, 'index'])->name('api.v1.composers.index');
    Route::get('/composers/{id}', [ComposerController::class, 'show'])->name('api.v1.composers.show');

    Route::get('/games', [GameController::class, 'index'])->name('api.v1.games.index');
    Route::get('/games/{id}', [GameController::class, 'show'])->name('api.v1.games.show');

    Route::get('/moods', [MoodController::class, 'index'])->name('api.v1.moods.index');

    Route::get('/scene-types', [SceneTypeController::class, 'index'])->name('api.v1.scene-types.index');

    Route::get('/tracks', [TrackController::class, 'index'])->name('api.v1.tracks.index');
    Route::get('/tracks/{id}', [TrackController::class, 'show'])->name('api.v1.tracks.show');
});
