<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class GameResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'original_title' => $this->original_title,
            'summary' => $this->summary,
            'description' => $this->description,
            'release_date' => $this->release_date,
            'cover_image_url' => $this->cover_image_url,
            'status' => $this->status?->label(),
            'published_at' => $this->published_at,
        ];
    }
}
