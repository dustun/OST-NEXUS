<?php

namespace App\Infrastructure\Persistence\Eloquent\Catalog\Models;

use App\Domain\Catalog\Enums\PublicationStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Track extends CatalogModel
{
    protected $fillable = [
        'game_id',
        'slug',
        'title',
        'disc_number',
        'track_number',
        'duration_seconds',
        'description',
        'is_spoiler',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'is_spoiler' => 'boolean',
            'status' => PublicationStatus::class,
            'published_at' => 'immutable_datetime',
        ];
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function composers(): BelongsToMany
    {
        return $this->belongsToMany(Composer::class)
            ->withPivot('role');
    }

    public function moods(): BelongsToMany
    {
        return $this->belongsToMany(Mood::class);
    }

    public function sceneTypes(): BelongsToMany
    {
        return $this->belongsToMany(SceneType::class);
    }

    public function playbackSources(): HasMany
    {
        return $this->hasMany(PlaybackSource::class)->orderBy('sort_order');
    }
}
