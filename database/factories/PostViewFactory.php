<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostView>
 */
class PostViewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "ip_address" => fake()->ipv6(),
            "user_agent" => fake()->userAgent(),
            "post_id" => fake()->numberBetween(1, 100),
            "user_id" => fake()->numberBetween(1, 11),
            'created_at' => fake()->dateTimeBetween("-1month", "now"),
            'updated_at' => fake()->dateTimeBetween("-1month", "now"),
        ];
    }
}
