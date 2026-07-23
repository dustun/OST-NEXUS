<?php

namespace App\Infrastructure\Persistence\Eloquent\Catalog\Models;

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
