<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Shared\Application\UseCases\GetSystemHealthUseCase;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class HealthController extends Controller
{
    public function __invoke(GetSystemHealthUseCase $useCase): JsonResponse
    {
        $data = $useCase();

        return response()->json([
            'data'   => $data->toArray(),
            'meta'   => [
                'apiVersion' => 'v1',
            ],
            'errors' => [],
        ]);
    }
}
