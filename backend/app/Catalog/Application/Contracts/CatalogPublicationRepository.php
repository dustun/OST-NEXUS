<?php

declare(strict_types=1);

namespace App\Catalog\Application\Contracts;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\TrackPublicationReadiness;
use DateTimeImmutable;

interface CatalogPublicationRepository
{
    public function status(CatalogItemType $type, string $id): PublicationStatus;

    public function trackReadiness(string $id): TrackPublicationReadiness;

    public function changeStatus(
        CatalogItemType $type,
        string $id,
        PublicationStatus $target,
        DateTimeImmutable $changedAt,
    ): void;
}
