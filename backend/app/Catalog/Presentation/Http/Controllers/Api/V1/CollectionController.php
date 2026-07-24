<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Catalog\Domain\Enums\CollectionType;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Collection;
use App\Catalog\Presentation\Http\Resources\CollectionResource;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class CollectionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Collection::query()
            ->where('status', PublicationStatus::Published->value)
            ->with(['currentlyPlayingTrack', 'items.track']);

        if ($type = $request->query('type')) {
            $query->where('type', CollectionType::from($type)->value);
        }

        $collections = $query->orderByDesc('published_at')->get();

        return response()->json(CollectionResource::collection($collections), 200);
    }

    public function show(string $id): JsonResponse
    {
        $collection = Collection::query()
            ->where('id', $id)
            ->where('status', PublicationStatus::Published->value)
            ->with(['currentlyPlayingTrack', 'items.track.game'])
            ->firstOrFail();

        return response()->json(new CollectionResource($collection), 200);
    }

    public function items(string $id): JsonResponse
    {
        $items = \App\Catalog\Infrastructure\Persistence\Eloquent\Models\CollectionItem::query()
            ->where('collection_id', $id)
            ->with('track')
            ->orderBy('sort_order')
            ->get();

        return response()->json($items, 200);
    }
}
