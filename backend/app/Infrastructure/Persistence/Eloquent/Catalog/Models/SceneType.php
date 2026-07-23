<?php

namespace App\Infrastructure\Persistence\Eloquent\Catalog\Models;

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
