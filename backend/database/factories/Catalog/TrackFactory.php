<?php

declare(strict_types=1);

namespace Database\Factories\Catalog;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Track>
 */
final class TrackFactory extends Factory
{
    protected $model = Track::class;

    public function definition(): array
    {
        return [
            'game_id'          => GameFactory::new(),
            'slug'             => fake()->unique()->slug(3),
            'title'            => fake()->sentence(3),
            'disc_number'      => 1,
            'track_number'     => fake()->unique()->numberBetween(1, 5000),
            'duration_seconds' => fake()->numberBetween(60, 600),
            'description'      => fake()->sentence(),
            'is_spoiler'       => false,
            'status'           => PublicationStatus::Draft,
            'published_at'     => null,
        ];
    }
}
