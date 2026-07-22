<?php

namespace App\Domain\System\ValueObjects;

enum ServiceStatus: string
{
    case Operational = 'ok';
}
