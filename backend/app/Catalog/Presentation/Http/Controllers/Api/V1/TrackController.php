<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use App\Catalog\Presentation\Http\Resources\TrackResource;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class TrackController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Track::query()
            ->where('status', PublicationStatus::Published->value)
            ->with(['game', 'composers', 'moods', 'sceneTypes', 'playbackSources']);

        if ($gameId = $request->query('game_id')) {
            $query->where('game_id', $gameId);
        }

        $tracks = $query->orderBy('disc_number')->orderBy('track_number')->get();

        return response()->json(TrackResource::collection($tracks), 200);
    }

    public function show(string $id): JsonResponse
    {
        $track = Track::query()
            ->where('id', $id)
            ->where('status', PublicationStatus::Published->value)
            ->with(['game', 'composers', 'moods', 'sceneTypes', 'playbackSources'])
            ->firstOrFail();

        return response()->json(new TrackResource($track), 200);
    }

    public function play(string $id): JsonResponse
    {
        $track = Track::query()
            ->where('id', $id)
            ->where('status', PublicationStatus::Published->value)
            ->with(['game', 'composers', 'moods', 'sceneTypes', 'playbackSources'])
            ->firstOrFail();

        $primarySource = $track->playbackSources
            ->where('is_primary', true)
            ->first();

        if (!$primarySource) {
            return response()->json(['error' => 'No primary playback source found'], 404);
        }

        return response()->json([
            'track' => new TrackResource($track),
            'source' => [
                'provider' => $primarySource->provider->name,
                'source_url' => $primarySource->source_url,
                'external_id' => $primarySource->external_id,
            ],
        ], 200);
    }
}
