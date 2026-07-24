<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class PlaybackSourceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'track_id' => $this->track_id,
            'provider' => $this->provider?->label(),
            'external_id' => $this->external_id,
            'source_url' => $this->source_url,
            'sort_order' => $this->sort_order,
            'is_primary' => $this->is_primary,
            'status' => $this->status?->label(),
            'last_checked_at' => $this->last_checked_at,
            'metadata' => $this->metadata,
        ];
    }
}
