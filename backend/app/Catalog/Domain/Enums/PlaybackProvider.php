<?php

namespace App\Catalog\Domain\Enums;

enum PlaybackProvider: int
{
    case YouTube = 0;

    public function label(): string
    {
        return match ($this) {
            self::YouTube => 'YouTube',
        };
    }
}
