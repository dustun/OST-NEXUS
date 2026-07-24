<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class CollectionItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'collection_id' => $this->collection_id,
            'track_id' => $this->track_id,
            'sort_order' => $this->sort_order,
            'note' => $this->note,
            'track' => TrackResource::make($this->whenLoaded('track')),
        ];
    }
}
