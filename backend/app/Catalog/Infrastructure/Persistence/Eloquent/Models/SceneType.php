<?php

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class SceneType extends CatalogModel
{
    protected $fillable = [
        'slug',
        'name',
        'description',
    ];

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class);
    }
}
