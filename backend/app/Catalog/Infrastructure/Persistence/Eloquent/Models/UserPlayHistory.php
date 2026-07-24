<?php

declare(strict_types=1);

namespace App\Catalog\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class UserPlayHistory extends CatalogModel
{
    protected $fillable = [
        'user_id',
        'track_id',
        'play_count',
        'last_played_at',
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
            'last_played_at' => 'immutable_datetime',
        ];
    }
}
