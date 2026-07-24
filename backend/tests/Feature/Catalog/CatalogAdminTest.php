<?php

namespace Tests\Feature\Catalog;

use App\Catalog\Application\Commands\ChangeCatalogPublicationStatus;
use App\Catalog\Application\Commands\ChangeCatalogPublicationStatusHandler;
use App\Auth\Domain\Enums\UserRole;
use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Presentation\Filament\Resources\Composers\Pages\ManageComposers;
use App\Catalog\Presentation\Filament\Resources\Games\Pages\ManageGames;
use App\Catalog\Presentation\Filament\Resources\Moods\Pages\ManageMoods;
use App\Catalog\Presentation\Filament\Resources\PlaybackSources\Pages\ManagePlaybackSources;
use App\Catalog\Presentation\Filament\Resources\SceneTypes\Pages\ManageSceneTypes;
use App\Catalog\Presentation\Filament\Resources\Tracks\Pages\ManageTracks;
use App\Auth\Infrastructure\Persistence\Model\User;
use Database\Factories\Catalog\ComposerFactory;
use Database\Factories\Catalog\GameFactory;
use Database\Factories\Catalog\MoodFactory;
use Database\Factories\Catalog\PlaybackSourceFactory;
use Database\Factories\Catalog\SceneTypeFactory;
use Database\Factories\Catalog\TrackFactory;
use Database\Factories\UserFactory;
use DomainException;
use Filament\Facades\Filament;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Livewire\Livewire;
use Tests\TestCase;

final class CatalogAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrator_can_open_every_catalog_resource(): void
    {
        $this->actingAs($this->panelUser(UserRole::Administrator));

        foreach ([
            '/admin/catalog/games',
            '/admin/catalog/tracks',
            '/admin/catalog/composers',
            '/admin/catalog/moods',
            '/admin/catalog/scene-types',
            '/admin/catalog/playback-sources',
        ] as $url) {
            $this->get($url)->assertOk();
        }

        Filament::setCurrentPanel('admin');

        foreach ([
            ManageGames::class,
            ManageTracks::class,
            ManageComposers::class,
            ManageMoods::class,
            ManageSceneTypes::class,
            ManagePlaybackSources::class,
        ] as $page) {
            Livewire::test($page)
                ->assertActionExists('create')
                ->mountAction('create')
                ->assertActionMounted('create');
        }
    }

    public function test_editor_can_edit_drafts_but_cannot_publish_or_delete_them(): void
    {
        $editor = $this->panelUser(UserRole::Editor);
        $administrator = $this->panelUser(UserRole::Administrator);
        $game = GameFactory::new()->create();

        $this->assertTrue(Gate::forUser($editor)->allows('viewAny', $game::class));
        $this->assertTrue(Gate::forUser($editor)->allows('update', $game));
        $this->assertFalse(Gate::forUser($editor)->allows('publish', $game));
        $this->assertFalse(Gate::forUser($editor)->allows('delete', $game));

        $this->assertTrue(Gate::forUser($administrator)->allows('publish', $game));
        $this->assertTrue(Gate::forUser($administrator)->allows('delete', $game));
    }

    public function test_incomplete_track_cannot_be_published(): void
    {
        $track = TrackFactory::new()->create();

        try {
            $this->changeStatus(
                CatalogItemType::Track,
                $track->getKey(),
                PublicationStatus::Published,
            );

            $this->fail('Публикация неполного трека должна завершаться ошибкой.');
        } catch (DomainException $exception) {
            $this->assertStringContainsString('опубликованная игра', $exception->getMessage());
            $this->assertStringContainsString('настроение', $exception->getMessage());
            $this->assertStringContainsString('тип сцены', $exception->getMessage());
            $this->assertStringContainsString('источник воспроизведения', $exception->getMessage());
        }

        $this->assertSame(PublicationStatus::Draft, $track->refresh()->status);
    }

    public function test_complete_track_can_be_published_and_archived(): void
    {
        $game = GameFactory::new()->create();
        $composer = ComposerFactory::new()->create();
        $track = TrackFactory::new()->create(['game_id' => $game->getKey()]);
        $mood = MoodFactory::new()->create();
        $sceneType = SceneTypeFactory::new()->create();
        $source = PlaybackSourceFactory::new()->create(['track_id' => $track->getKey()]);

        $track->composers()->attach($composer, ['role' => 'composer']);
        $track->moods()->attach($mood);
        $track->sceneTypes()->attach($sceneType);

        $this->changeStatus(CatalogItemType::Game, $game->getKey(), PublicationStatus::Published);
        $this->changeStatus(CatalogItemType::Composer, $composer->getKey(), PublicationStatus::Published);
        $this->changeStatus(CatalogItemType::PlaybackSource, $source->getKey(), PublicationStatus::Published);
        $this->changeStatus(CatalogItemType::Track, $track->getKey(), PublicationStatus::Published);

        $track->refresh();

        $this->assertSame(PublicationStatus::Published, $track->status);
        $this->assertNotNull($track->published_at);

        $this->changeStatus(CatalogItemType::Track, $track->getKey(), PublicationStatus::Archived);

        $this->assertSame(PublicationStatus::Archived, $track->refresh()->status);
    }

    private function panelUser(UserRole $role): User
    {
        return UserFactory::new()->create([
            'is_admin' => true,
            'role' => $role,
        ]);
    }

    private function changeStatus(
        CatalogItemType $type,
        string $id,
        PublicationStatus $target,
    ): void {
        app(ChangeCatalogPublicationStatusHandler::class)->handle(
            new ChangeCatalogPublicationStatus(
                type: $type,
                id: $id,
                target: $target,
            ),
        );
    }
}
