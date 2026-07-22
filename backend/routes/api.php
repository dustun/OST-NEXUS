<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', function () {
        return response()->json([
            'data' => [
                'service' => 'ost-nexus-api',
                'status' => 'ok',
                'timestamp' => now()->toIso8601String(),
            ],
            'meta' => [
                'apiVersion' => 'v1',
            ],
            'errors' => [],
        ]);
    })->name('api.v1.health');
});
