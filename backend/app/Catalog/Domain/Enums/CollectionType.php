<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Enums;

enum CollectionType: int
{
    case Radio     = 0;
    case Playlist  = 1;
    case Favorites = 2;
    case Mix       = 3;

    public function label(): string
    {
        return match ($this) {
            self::Radio     => 'Радио',
            self::Playlist  => 'Плейлист',
            self::Favorites => 'Избранное',
            self::Mix       => 'Подборка',
        };
    }
}
