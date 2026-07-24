<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Enums;

enum PlaybackProvider: int
{
    case YouTube = 0;
    case SoundCloud = 1;

    public function label(): string
    {
        return match ($this) {
            self::YouTube => 'YouTube',
            self::SoundCloud => 'SoundCloud',
        };
    }
}
