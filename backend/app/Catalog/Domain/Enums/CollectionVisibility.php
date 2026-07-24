<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Enums;

enum CollectionVisibility: int
{
    case Public    = 0;
    case Unlisted  = 1;
    case Private   = 2;

    public function label(): string
    {
        return match ($this) {
            self::Public    => 'Публичная',
            self::Unlisted  => 'По ссылке',
            self::Private   => 'Приватная',
        };
    }
}
