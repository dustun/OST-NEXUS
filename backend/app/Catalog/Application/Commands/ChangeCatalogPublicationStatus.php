<?php

declare(strict_types=1);

namespace App\Catalog\Application\Commands;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;

final readonly class ChangeCatalogPublicationStatus
{
    public function __construct(
        public CatalogItemType $type,
        public string $id,
        public PublicationStatus $target,
    ) {}
}
