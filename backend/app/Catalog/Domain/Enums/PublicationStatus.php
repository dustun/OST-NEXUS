<?php

namespace App\Catalog\Domain\Enums;

enum PublicationStatus: int
{
    case Draft = 0;
    case Published = 1;
    case Archived = 2;

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Черновик',
            self::Published => 'Опубликовано',
            self::Archived => 'В архиве',
        };
    }

    /**
     * @return array<int, string>
     */
    public static function options(): array
    {
        return [
            self::Draft->value => self::Draft->label(),
            self::Published->value => self::Published->label(),
            self::Archived->value => self::Archived->label(),
        ];
    }

    public function canTransitionTo(self $target): bool
    {
        return match ($this) {
            self::Draft => $target === self::Published,
            self::Published => $target === self::Archived,
            self::Archived => false,
        };
    }
}
