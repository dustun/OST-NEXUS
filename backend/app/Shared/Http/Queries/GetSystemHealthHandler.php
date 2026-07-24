<?php

namespace App\Shared\Http\Queries;

use App\Shared\Contracts\Clock;
use App\Shared\DTO\SystemHealthData;
use App\Shared\Domain\ValueObjects\ServiceStatus;

final readonly class GetSystemHealthHandler
{
    public function __construct(private Clock $clock) {}

    public function handle(): SystemHealthData
    {
        return new SystemHealthData(
            service: 'ost-nexus-api',
            status: ServiceStatus::Operational->value,
            timestamp: $this->clock->now()->format(DATE_ATOM),
        );
    }
}
