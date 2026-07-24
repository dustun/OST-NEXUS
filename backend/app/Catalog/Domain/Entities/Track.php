<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Entities;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\CatalogId;
use App\Catalog\Domain\ValueObjects\Slug;
use InvalidArgumentException;

final class Track
{
    private function __construct(
        private readonly CatalogId $id,
        private readonly CatalogId $gameId,
        private readonly Slug $slug,
        private readonly string $title,
        private readonly bool $spoiler,
        private PublicationStatus $status,
    ) {}

    public static function draft(
        CatalogId $id,
        CatalogId $gameId,
        Slug $slug,
        string $title,
        bool $spoiler = false,
    ): self {
        $title = trim($title);

        if ($title === '') {
            throw new InvalidArgumentException('Название трека не может быть пустым.');
        }

        return new self(
            id: $id,
            gameId: $gameId,
            slug: $slug,
            title: $title,
            spoiler: $spoiler,
            status: PublicationStatus::Draft,
        );
    }

    public function publish(): void
    {
        if ($this->status === PublicationStatus::Draft) {
            $this->status = PublicationStatus::Published;
        }
    }

    public function status(): PublicationStatus
    {
        return $this->status;
    }

    public function isSpoiler(): bool
    {
        return $this->spoiler;
    }
}
