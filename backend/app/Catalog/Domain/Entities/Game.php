<?php

namespace App\Catalog\Domain\Entities;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\CatalogId;
use App\Catalog\Domain\ValueObjects\Slug;
use DomainException;
use InvalidArgumentException;

final class Game
{
    private function __construct(
        private readonly CatalogId $id,
        private readonly Slug $slug,
        private string $title,
        private PublicationStatus $status,
    ) {}

    public static function draft(CatalogId $id, Slug $slug, string $title): self
    {
        return new self(
            id: $id,
            slug: $slug,
            title: self::validateTitle($title),
            status: PublicationStatus::Draft,
        );
    }

    public function publish(): void
    {
        if ($this->status === PublicationStatus::Published) {
            return;
        }

        if (! $this->status->canTransitionTo(PublicationStatus::Published)) {
            throw new DomainException('Игру нельзя опубликовать из текущего состояния.');
        }

        $this->status = PublicationStatus::Published;
    }

    public function archive(): void
    {
        if (! $this->status->canTransitionTo(PublicationStatus::Archived)) {
            throw new DomainException('Игру можно архивировать только после публикации.');
        }

        $this->status = PublicationStatus::Archived;
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

    public function status(): PublicationStatus
    {
        return $this->status;
    }

    private static function validateTitle(string $title): string
    {
        $title = trim($title);

        if ($title === '') {
            throw new InvalidArgumentException('Название игры не может быть пустым.');
        }

        return $title;
    }
}
