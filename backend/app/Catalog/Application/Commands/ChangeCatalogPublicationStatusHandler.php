<?php

declare(strict_types=1);

namespace App\Catalog\Application\Commands;

use App\Catalog\Application\Contracts\CatalogPublicationRepository;
use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\Services\PublicationPolicy;
use App\Shared\Contracts\Clock;

final readonly class ChangeCatalogPublicationStatusHandler
{
    public function __construct(
        private CatalogPublicationRepository $catalog,
        private PublicationPolicy $policy,
        private Clock $clock,
    ) {}

    public function handle(ChangeCatalogPublicationStatus $command): void
    {
        $current   = $this->catalog->status($command->type, $command->id);
        $readiness = $command->type === CatalogItemType::Track
            && $command->target === PublicationStatus::Published
                ? $this->catalog->trackReadiness($command->id)
                : null;

        $this->policy->ensureTransitionAllowed(
            type: $command->type,
            current: $current,
            target: $command->target,
            trackReadiness: $readiness,
        );

        if ($current === $command->target) {
            return;
        }

        $this->catalog->changeStatus(
            type: $command->type,
            id: $command->id,
            target: $command->target,
            changedAt: $this->clock->now(),
        );
    }
}
