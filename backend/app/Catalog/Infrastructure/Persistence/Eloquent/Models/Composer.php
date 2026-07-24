<?php

declare(strict_types=1);

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use App\Catalog\Domain\Enums\PublicationStatus;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class Composer extends CatalogModel
{
    protected $fillable = [
        'slug',
        'name',
        'bio',
        'photo_url',
        'status',
        'published_at',
    ];

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class)
            ->withPivot('role');
    }

    protected function casts(): array
    {
        return [
            'status'       => PublicationStatus::class,
            'published_at' => 'immutable_datetime',
        ];
    }
}
