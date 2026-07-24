<?php

declare(strict_types=1);

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class Mood extends CatalogModel
{
    protected $fillable = [
        'slug',
        'name',
        'color',
        'description',
    ];

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class);
    }
}
