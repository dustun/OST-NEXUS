<?php

namespace Tests\Unit\Domain\Catalog;

use App\Catalog\Domain\Entities\Game;
use App\Catalog\Domain\Entities\Track;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\CatalogId;
use App\Catalog\Domain\ValueObjects\Slug;
use DomainException;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

final class CatalogDomainTest extends TestCase
{
    public function test_game_moves_through_the_allowed_publication_lifecycle(): void
    {
        $game = Game::draft(
            CatalogId::fromString('11111111-1111-4111-8111-111111111111'),
            Slug::fromString('first-signal'),
            'Первый сигнал',
        );

        $this->assertSame(PublicationStatus::Draft, $game->status());

        $game->publish();

        $this->assertSame(PublicationStatus::Published, $game->status());

        $game->archive();

        $this->assertSame(PublicationStatus::Archived, $game->status());
    }

    public function test_archived_game_cannot_be_published_again(): void
    {
        $game = Game::draft(
            CatalogId::fromString('11111111-1111-4111-8111-111111111111'),
            Slug::fromString('first-signal'),
            'Первый сигнал',
        );
        $game->publish();
        $game->archive();

        $this->expectException(DomainException::class);

        $game->publish();
    }

    public function test_track_preserves_spoiler_flag_when_published(): void
    {
        $track = Track::draft(
            CatalogId::fromString('22222222-2222-4222-8222-222222222222'),
            CatalogId::fromString('11111111-1111-4111-8111-111111111111'),
            Slug::fromString('nexus-heart'),
            'Сердце Нексуса',
            spoiler: true,
        );

        $track->publish();

        $this->assertSame(PublicationStatus::Published, $track->status());
        $this->assertTrue($track->isSpoiler());
    }

    public function test_slug_rejects_values_that_are_not_url_safe(): void
    {
        $this->expectException(InvalidArgumentException::class);

        Slug::fromString('Первый сигнал');
    }
}
