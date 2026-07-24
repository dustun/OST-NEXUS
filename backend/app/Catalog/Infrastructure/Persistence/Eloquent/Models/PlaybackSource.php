<?php

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use App\Catalog\Domain\Enums\PlaybackProvider;
use App\Catalog\Domain\Enums\PublicationStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class PlaybackSource extends CatalogModel
{
    protected $fillable = [
        'track_id',
        'provider',
        'external_id',
        'source_url',
        'sort_order',
        'is_primary',
        'status',
        'last_checked_at',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'provider' => PlaybackProvider::class,
            'is_primary' => 'boolean',
            'status' => PublicationStatus::class,
            'last_checked_at' => 'immutable_datetime',
            'metadata' => 'array',
        ];
    }

    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }
}
