<?php

declare(strict_types=1);

namespace App\Shared\Domain\ValueObjects;

enum ServiceStatus: string
{
    case Operational = 'ok';
}
