<?php

namespace App\Application\System\Queries;

use App\Application\Shared\Contracts\Clock;
use App\Application\System\DTO\SystemHealthData;
use App\Domain\System\ValueObjects\ServiceStatus;

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
