<?php

declare(strict_types=1);

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use App\Catalog\Domain\Enums\CollectionType;
use App\Catalog\Domain\Enums\CollectionVisibility;
use App\Catalog\Domain\Enums\PublicationStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Collection extends CatalogModel
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'type',
        'visibility',
        'owner_type',
        'owner_id',
        'cover_image_url',
        'is_live',
        'frequency',
        'color',
        'currently_playing_track_id',
        'status',
        'published_at',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(CollectionItem::class)->orderBy('sort_order');
    }

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class, 'collection_items')
            ->withPivot('sort_order', 'note')
            ->orderBy('collection_items.sort_order');
    }

    public function currentlyPlayingTrack(): BelongsTo
    {
        return $this->belongsTo(Track::class, 'currently_playing_track_id');
    }

    protected function casts(): array
    {
        return [
            'type' => CollectionType::class,
            'visibility' => CollectionVisibility::class,
            'is_live' => 'boolean',
            'status' => PublicationStatus::class,
            'published_at' => 'immutable_datetime',
        ];
    }
}
