<?php

namespace App\Shared\Domain\ValueObjects;

enum ServiceStatus: string
{
    case Operational = 'ok';
}
