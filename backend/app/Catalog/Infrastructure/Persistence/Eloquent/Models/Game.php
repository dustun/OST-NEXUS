<?php

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use App\Catalog\Domain\Enums\PublicationStatus;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Game extends CatalogModel
{
    protected $fillable = [
        'slug',
        'title',
        'original_title',
        'summary',
        'description',
        'release_date',
        'cover_image_url',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'release_date' => 'date',
            'status' => PublicationStatus::class,
            'published_at' => 'immutable_datetime',
        ];
    }

    public function tracks(): HasMany
    {
        return $this->hasMany(Track::class)->orderBy('disc_number')->orderBy('track_number');
    }
}
