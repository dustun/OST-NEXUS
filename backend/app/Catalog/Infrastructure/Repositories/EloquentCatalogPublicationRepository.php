<?php

namespace App\Catalog\Infrastructure\Repositories;

use App\Catalog\Application\Contracts\CatalogPublicationRepository;
use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\TrackPublicationReadiness;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\CatalogModel;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\PlaybackSource;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use DateTimeImmutable;

final class EloquentCatalogPublicationRepository implements CatalogPublicationRepository
{
    public function status(CatalogItemType $type, string $id): PublicationStatus
    {
        return $this->find($type, $id)->status;
    }

    public function trackReadiness(string $id): TrackPublicationReadiness
    {
        $track = Track::query()->with('game')->findOrFail($id);

        return new TrackPublicationReadiness(
            hasPublishedGame: $track->game?->status === PublicationStatus::Published,
            hasPublishedComposer: $track->composers()
                ->where('composers.status', PublicationStatus::Published->value)
                ->exists(),
            hasMood: $track->moods()->exists(),
            hasSceneType: $track->sceneTypes()->exists(),
            hasPublishedSource: $track->playbackSources()
                ->where('status', PublicationStatus::Published->value)
                ->exists(),
        );
    }

    public function changeStatus(
        CatalogItemType $type,
        string $id,
        PublicationStatus $target,
        DateTimeImmutable $changedAt,
    ): void {
        $record = $this->find($type, $id);
        $attributes = ['status' => $target];

        if ($target === PublicationStatus::Published && $type !== CatalogItemType::PlaybackSource) {
            $attributes['published_at'] = $changedAt;
        }

        $record->forceFill($attributes)->save();
    }

    private function find(CatalogItemType $type, string $id): CatalogModel
    {
        $model = match ($type) {
            CatalogItemType::Game => Game::class,
            CatalogItemType::Track => Track::class,
            CatalogItemType::Composer => Composer::class,
            CatalogItemType::PlaybackSource => PlaybackSource::class,
        };

        return $model::query()->findOrFail($id);
    }
}
