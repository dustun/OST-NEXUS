<?php

declare(strict_types=1);

namespace Tests\Feature\Catalog;

use App\Catalog\Domain\Enums\PlaybackProvider;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use Database\Factories\Catalog\GameFactory;
use Database\Factories\Catalog\PlaybackSourceFactory;
use Database\Factories\Catalog\TrackFactory;
use Database\Seeders\CatalogSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class CatalogSchemaTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalog_seeder_creates_the_first_complete_vertical_slice(): void
    {
        $this->seed(CatalogSeeder::class);

        $this->assertDatabaseCount('games', 1);
        $this->assertDatabaseCount('tracks', 3);
        $this->assertDatabaseCount('composers', 1);
        $this->assertDatabaseCount('moods', 2);
        $this->assertDatabaseCount('scene_types', 2);
        $this->assertDatabaseCount('playback_sources', 3);
        $this->assertDatabaseCount('composer_track', 3);
        $this->assertDatabaseCount('mood_track', 4);
        $this->assertDatabaseCount('scene_type_track', 3);

        $game = Game::query()
            ->with('tracks.composers', 'tracks.moods', 'tracks.sceneTypes', 'tracks.playbackSources')
            ->sole();

        $this->assertSame(PublicationStatus::Published, $game->status);
        $this->assertCount(3, $game->tracks);

        $game->tracks->each(function (Track $track): void {
            $this->assertCount(1, $track->composers);
            $this->assertCount(1, $track->playbackSources);
            $this->assertSame(
                PlaybackProvider::YouTube,
                $track->playbackSources->sole()->provider,
            );
        });
    }

    public function test_catalog_seeder_is_idempotent(): void
    {
        $this->seed(CatalogSeeder::class);
        $this->seed(CatalogSeeder::class);

        $this->assertDatabaseCount('games', 1);
        $this->assertDatabaseCount('tracks', 3);
        $this->assertDatabaseCount('playback_sources', 3);
    }

    public function test_catalog_factories_create_related_records(): void
    {
        $game   = GameFactory::new()->create();
        $track  = TrackFactory::new()->create([
            'game_id' => $game->getKey(),
        ]);
        $source = PlaybackSourceFactory::new()->create([
            'track_id' => $track->getKey(),
        ]);

        $this->assertTrue($track->game->is($game));
        $this->assertTrue($source->track->is($track));
    }
}
