<?php

namespace App\Auth\Domain\Enums;

enum UserRole: int
{
    case Editor = 0;
    case Administrator = 1;

    public function label(): string
    {
        return match ($this) {
            self::Editor => 'Редактор',
            self::Administrator => 'Администратор',
        };
    }
}
