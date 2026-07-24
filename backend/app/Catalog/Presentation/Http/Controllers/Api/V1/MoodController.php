<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Mood;
use App\Catalog\Presentation\Http\Resources\MoodResource;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class MoodController extends Controller
{
    public function index(): JsonResponse
    {
        $moods = Mood::query()->orderBy('name')->get();

        return response()->json(MoodResource::collection($moods), 200);
    }
}
