<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Catalog\Infrastructure\Persistence\Eloquent\Models\SceneType;
use App\Catalog\Presentation\Http\Resources\SceneTypeResource;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class SceneTypeController extends Controller
{
    public function index(): JsonResponse
    {
        $sceneTypes = SceneType::query()->orderBy('name')->get();

        return response()->json(SceneTypeResource::collection($sceneTypes), 200);
    }
}
