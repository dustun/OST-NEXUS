<?php

declare(strict_types=1);

namespace App\Shared\Application\UseCases;

use App\Shared\Contracts\Clock;
use App\Shared\Domain\ValueObjects\ServiceStatus;
use App\Shared\Http\DTO\SystemHealthData;

final readonly class GetSystemHealthUseCase
{
    public function __construct(private Clock $clock) {}

    public function __invoke(): SystemHealthData
    {
        return new SystemHealthData(
            service: 'ost-nexus-api',
            status: ServiceStatus::Operational->value,
            timestamp: $this->clock->now()->format(DATE_ATOM),
        );
    }
}
