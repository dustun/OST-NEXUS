<?php

declare(strict_types=1);

namespace Database\Factories\Catalog;

use App\Catalog\Infrastructure\Persistence\Eloquent\Models\SceneType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SceneType>
 */
final class SceneTypeFactory extends Factory
{
    protected $model = SceneType::class;

    public function definition(): array
    {
        return [
            'slug'        => fake()->unique()->slug(2),
            'name'        => fake()->unique()->word(),
            'description' => fake()->sentence(),
        ];
    }
}
