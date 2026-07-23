<?php

namespace Database\Factories\Catalog;

use App\Domain\Catalog\Enums\PlaybackProvider;
use App\Domain\Catalog\Enums\PublicationStatus;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\PlaybackSource;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PlaybackSource>
 */
final class PlaybackSourceFactory extends Factory
{
    protected $model = PlaybackSource::class;

    public function definition(): array
    {
        return [
            'track_id' => TrackFactory::new(),
            'provider' => PlaybackProvider::YouTube,
            'external_id' => fake()->unique()->regexify('[A-Za-z0-9_-]{11}'),
            'source_url' => null,
            'sort_order' => 0,
            'is_primary' => true,
            'status' => PublicationStatus::Draft,
            'last_checked_at' => null,
            'metadata' => null,
        ];
    }
}
