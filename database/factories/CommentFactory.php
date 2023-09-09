<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "body" => fake()->realText(fake()->numberBetween(10, 255)),
            "user_id" => fake()->numberBetween(1, 11),
            "post_id" => fake()->numberBetween(1, 100),
            'created_at' => fake()->dateTimeBetween("-1month", "now"),
            'updated_at' => fake()->dateTimeBetween("-1month", "now"),
        ];
    }
}
