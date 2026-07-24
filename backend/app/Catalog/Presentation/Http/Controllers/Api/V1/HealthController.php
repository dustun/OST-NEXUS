<?php

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Shared\Http\Queries\GetSystemHealthHandler;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class HealthController extends Controller
{
    public function __invoke(GetSystemHealthHandler $handler): JsonResponse
    {
        return response()->json([
            'data' => $handler->handle()->toArray(),
            'meta' => [
                'apiVersion' => 'v1',
            ],
            'errors' => [],
        ]);
    }
}
