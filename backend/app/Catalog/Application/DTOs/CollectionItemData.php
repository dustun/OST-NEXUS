<?php

declare(strict_types=1);

namespace App\Catalog\Application\DTOs;

use Spatie\LaravelData\Data;

class CollectionItemData extends Data
{
    public function __construct(
        public string $id,
        public string $collectionId,
        public string $trackId,
        public int $sortOrder,
        public ?string $note,
    ) {}
}
