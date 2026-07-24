<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class TrackResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'disc_number' => $this->disc_number,
            'track_number' => $this->track_number,
            'duration_seconds' => $this->duration_seconds,
            'description' => $this->description,
            'is_spoiler' => $this->is_spoiler,
            'status' => $this->status?->label(),
            'published_at' => $this->published_at,
            'game' => GameResource::make($this->whenLoaded('game')),
            'composers' => ComposerResource::collection($this->whenLoaded('composers')),
            'moods' => MoodResource::collection($this->whenLoaded('moods')),
            'scene_types' => SceneTypeResource::collection($this->whenLoaded('sceneTypes')),
            'playback_sources' => PlaybackSourceResource::collection($this->whenLoaded('playbackSources')),
        ];
    }
}
