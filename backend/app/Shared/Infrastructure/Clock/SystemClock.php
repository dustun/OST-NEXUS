<?php

namespace App\Shared\Infrastructure\Clock;

use App\Shared\Contracts\Clock;
use DateTimeImmutable;

final class SystemClock implements Clock
{
    public function now(): DateTimeImmutable
    {
        return new DateTimeImmutable;
    }
}
