<?php

namespace Database\Factories\Catalog;

use App\Infrastructure\Persistence\Eloquent\Catalog\Models\SceneType;
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
            'slug' => fake()->unique()->slug(2),
            'name' => fake()->unique()->word(),
            'description' => fake()->sentence(),
        ];
    }
}
