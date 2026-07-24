<?php

declare(strict_types=1);

namespace App\Catalog\Application\DTOs;

use App\Catalog\Domain\Enums\CollectionType;
use App\Catalog\Domain\Enums\CollectionVisibility;
use App\Catalog\Domain\Enums\PublicationStatus;
use Spatie\LaravelData\Data;

class CollectionData extends Data
{
    public function __construct(
        public string $id,
        public string $slug,
        public string $title,
        public ?string $description,
        public CollectionType $type,
        public CollectionVisibility $visibility,
        public ?string $ownerType,
        public ?string $ownerId,
        public ?string $coverImageUrl,
        public bool $isLive,
        public ?string $frequency,
        public ?string $color,
        public ?string $currentlyPlayingTrackId,
        public PublicationStatus $status,
        public ?string $publishedAt,
        public array $items,
    ) {}
}
