<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->realText(fake()->numberBetween(10, 100)),
            'body' => fake()->realText(fake()->numberBetween(10, 255)),
            'image' => fake()->imageUrl(),
            'user_id' => fake()->randomNumber(1, 11),
            'created_at' => fake()->dateTimeBetween("-1month", "now"),
            'updated_at' => fake()->dateTimeBetween("-1month", "now"),
        ];
    }
}
