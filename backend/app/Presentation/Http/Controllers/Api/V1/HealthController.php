<?php

namespace App\Presentation\Http\Controllers\Api\V1;

use App\Application\System\Queries\GetSystemHealthHandler;
use App\Http\Controllers\Controller;
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
