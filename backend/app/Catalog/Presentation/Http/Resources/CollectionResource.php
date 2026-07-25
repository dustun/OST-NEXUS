<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class CollectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'type' => strtolower($this->type?->name ?? ''),
            'visibility' => strtolower($this->visibility?->name ?? ''),
            'owner_type' => $this->owner_type,
            'owner_id' => $this->owner_id,
            'cover_image_url' => $this->cover_image_url,
            'is_live' => $this->is_live,
            'frequency' => $this->frequency,
            'color' => $this->color,
            'currently_playing_track_id' => $this->currently_playing_track_id,
            'status' => strtolower($this->status?->name ?? ''),
            'published_at' => $this->published_at,
            'items' => CollectionItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
