<?php

namespace Database\Factories\Catalog;

use App\Domain\Catalog\Enums\PublicationStatus;
use App\Infrastructure\Persistence\Eloquent\Catalog\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Game>
 */
final class GameFactory extends Factory
{
    protected $model = Game::class;

    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(3),
            'title' => fake()->sentence(3),
            'original_title' => null,
            'summary' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'release_date' => fake()->date(),
            'cover_image_url' => null,
            'status' => PublicationStatus::Draft,
            'published_at' => null,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (): array => [
            'status' => PublicationStatus::Published,
            'published_at' => now(),
        ]);
    }
}
