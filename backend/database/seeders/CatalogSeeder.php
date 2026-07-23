<?php

namespace Database\Seeders;

use App\Domain\Catalog\Enums\PlaybackProvider;
use App\Domain\Catalog\Enums\PublicationStatus;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\Composer;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\Game;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\Mood;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\PlaybackSource;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\SceneType;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\Track;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

final class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function (): void {
            $publishedAt = now();

            $game = Game::query()->updateOrCreate(
                ['slug' => 'ost-nexus-first-signal'],
                [
                    'title' => 'OST NEXUS: Первый сигнал',
                    'original_title' => 'OST NEXUS: First Signal',
                    'summary' => 'Демонстрационный музыкальный мир для первого вертикального среза.',
                    'description' => 'Технический каталог проверяет связи игры, треков, композитора, настроений, сцен и источников воспроизведения.',
                    'release_date' => '2026-07-23',
                    'status' => PublicationStatus::Published,
                    'published_at' => $publishedAt,
                ],
            );

            $composer = Composer::query()->updateOrCreate(
                ['slug' => 'nexus-ensemble'],
                [
                    'name' => 'Nexus Ensemble',
                    'bio' => 'Демонстрационный автор первого музыкального мира OST NEXUS.',
                    'status' => PublicationStatus::Published,
                    'published_at' => $publishedAt,
                ],
            );

            $moods = collect([
                ['slug' => 'contemplative', 'name' => 'Созерцательное', 'color' => '#8B7CFF'],
                ['slug' => 'intense', 'name' => 'Напряжённое', 'color' => '#FF5C7A'],
            ])->mapWithKeys(function (array $attributes): array {
                $mood = Mood::query()->updateOrCreate(
                    ['slug' => $attributes['slug']],
                    $attributes,
                );

                return [$attributes['slug'] => $mood];
            });

            $sceneTypes = collect([
                ['slug' => 'exploration', 'name' => 'Исследование'],
                ['slug' => 'boss-battle', 'name' => 'Битва с боссом'],
            ])->mapWithKeys(function (array $attributes): array {
                $sceneType = SceneType::query()->updateOrCreate(
                    ['slug' => $attributes['slug']],
                    $attributes,
                );

                return [$attributes['slug'] => $sceneType];
            });

            $tracks = [
                [
                    'slug' => 'awakening',
                    'title' => 'Пробуждение',
                    'track_number' => 1,
                    'duration_seconds' => 192,
                    'is_spoiler' => false,
                    'moods' => ['contemplative'],
                    'scenes' => ['exploration'],
                ],
                [
                    'slug' => 'between-worlds',
                    'title' => 'Между мирами',
                    'track_number' => 2,
                    'duration_seconds' => 215,
                    'is_spoiler' => false,
                    'moods' => ['contemplative', 'intense'],
                    'scenes' => ['exploration'],
                ],
                [
                    'slug' => 'nexus-heart',
                    'title' => 'Сердце Нексуса',
                    'track_number' => 3,
                    'duration_seconds' => 248,
                    'is_spoiler' => true,
                    'moods' => ['intense'],
                    'scenes' => ['boss-battle'],
                ],
            ];

            foreach ($tracks as $trackData) {
                $track = Track::query()->updateOrCreate(
                    [
                        'game_id' => $game->getKey(),
                        'slug' => $trackData['slug'],
                    ],
                    [
                        'title' => $trackData['title'],
                        'disc_number' => 1,
                        'track_number' => $trackData['track_number'],
                        'duration_seconds' => $trackData['duration_seconds'],
                        'is_spoiler' => $trackData['is_spoiler'],
                        'status' => PublicationStatus::Published,
                        'published_at' => $publishedAt,
                    ],
                );

                $track->composers()->sync([
                    $composer->getKey() => ['role' => 'composer'],
                ]);
                $track->moods()->sync(
                    $moods->only($trackData['moods'])->pluck('id')->all(),
                );
                $track->sceneTypes()->sync(
                    $sceneTypes->only($trackData['scenes'])->pluck('id')->all(),
                );

                PlaybackSource::query()->updateOrCreate(
                    [
                        'track_id' => $track->getKey(),
                        'provider' => PlaybackProvider::YouTube->value,
                        'external_id' => 'M7lc1UVf-VE',
                    ],
                    [
                        'source_url' => 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
                        'sort_order' => 0,
                        'is_primary' => true,
                        'status' => PublicationStatus::Published,
                        'metadata' => [
                            'purpose' => 'YouTube IFrame API demo source',
                        ],
                    ],
                );
            }
        });
    }
}
