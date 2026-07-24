<?php

namespace Database\Factories\Catalog;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Composer>
 */
final class ComposerFactory extends Factory
{
    protected $model = Composer::class;

    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(2),
            'name' => fake()->name(),
            'bio' => fake()->paragraph(),
            'photo_url' => null,
            'status' => PublicationStatus::Draft,
            'published_at' => null,
        ];
    }
}
