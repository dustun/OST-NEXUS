<?php

declare(strict_types=1);

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class UserQueueItem extends CatalogModel
{
    protected $fillable = [
        'user_id',
        'track_id',
        'sort_order',
        'added_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Auth\Infrastructure\Persistence\Model\User::class);
    }

    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }

    protected function casts(): array
    {
        return [
            'added_at' => 'immutable_datetime',
        ];
    }
}
