<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Entities;

use App\Catalog\Domain\Enums\CollectionType;
use App\Catalog\Domain\Enums\CollectionVisibility;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\CatalogId;
use App\Catalog\Domain\ValueObjects\Slug;
use DomainException;
use InvalidArgumentException;

final class Collection
{
    private function __construct(
        private readonly CatalogId $id,
        private readonly Slug $slug,
        private string $title,
        private CollectionType $type,
        private CollectionVisibility $visibility,
        private ?string $ownerType,
        private ?string $ownerId,
        private PublicationStatus $status,
        private ?string $frequency,
        private ?string $color,
        private ?CatalogId $currentlyPlayingTrackId,
    ) {}

    public static function create(
        CatalogId $id,
        Slug $slug,
        string $title,
        CollectionType $type,
        CollectionVisibility $visibility,
        ?string $ownerType,
        ?string $ownerId,
    ): self {
        $title = trim($title);

        if ($title === '') {
            throw new InvalidArgumentException('Название подборки не может быть пустым.');
        }

        return new self(
            id: $id,
            slug: $slug,
            title: $title,
            type: $type,
            visibility: $visibility,
            ownerType: $ownerType,
            ownerId: $ownerId,
            status: PublicationStatus::Draft,
            frequency: $type === CollectionType::Radio ? '87.5 FM' : null,
            color: $type === CollectionType::Radio ? '#8B5CF6' : null,
            currentlyPlayingTrackId: null,
        );
    }

    public function id(): CatalogId
    {
        return $this->id;
    }

    public function slug(): Slug
    {
        return $this->slug;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function type(): CollectionType
    {
        return $this->type;
    }

    public function visibility(): CollectionVisibility
    {
        return $this->visibility;
    }

    public function ownerType(): ?string
    {
        return $this->ownerType;
    }

    public function ownerId(): ?string
    {
        return $this->ownerId;
    }

    public function status(): PublicationStatus
    {
        return $this->status;
    }

    public function frequency(): ?string
    {
        return $this->frequency;
    }

    public function color(): ?string
    {
        return $this->color;
    }

    public function currentlyPlayingTrackId(): ?CatalogId
    {
        return $this->currentlyPlayingTrackId;
    }

    public function publish(): void
    {
        if ($this->status === PublicationStatus::Draft) {
            $this->status = PublicationStatus::Published;
        }
    }

    public function archive(): void
    {
        if ($this->status === PublicationStatus::Published) {
            $this->status = PublicationStatus::Archived;
        }
    }

    public function updateRadio(?string $frequency, ?string $color, ?CatalogId $trackId): void
    {
        $this->frequency = $frequency;
        $this->color = $color;
        $this->currentlyPlayingTrackId = $trackId;
    }

    public function makeLive(): void
    {
        if (!$this->isLive()) {
            throw new DomainException('Только опубликованные радио могут начинать эфир.');
        }
    }

    public function isLive(): bool
    {
        return $this->type === CollectionType::Radio && $this->status === PublicationStatus::Published;
    }
}
