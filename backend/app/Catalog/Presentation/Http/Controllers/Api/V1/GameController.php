<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Presentation\Http\Resources\GameResource;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class GameController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $games = Game::query()
            ->where('status', PublicationStatus::Published->value)
            ->orderByDesc('published_at')
            ->get(['id', 'slug', 'title', 'original_title', 'cover_image_url', 'release_date', 'summary']);

        return response()->json(GameResource::collection($games), 200);
    }

    public function show(string $id): JsonResponse
    {
        $game = Game::query()
            ->where('id', $id)
            ->where('status', PublicationStatus::Published->value)
            ->firstOrFail();

        return response()->json(new GameResource($game), 200);
    }
}
