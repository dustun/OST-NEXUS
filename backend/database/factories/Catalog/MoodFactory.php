<?php

namespace Database\Factories\Catalog;

use App\Infrastructure\Persistence\Eloquent\Catalog\Models\Mood;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mood>
 */
final class MoodFactory extends Factory
{
    protected $model = Mood::class;

    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(2),
            'name' => fake()->unique()->word(),
            'color' => fake()->hexColor(),
            'description' => fake()->sentence(),
        ];
    }
}
