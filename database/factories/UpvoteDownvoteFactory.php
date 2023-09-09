<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UpvoteDownvote>
 */
class UpvoteDownvoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $allPossiblePairs = [];

        for ($i = 1; $i <= 100; $i++) {
            for ($j = 1; $j <= 11; $j++) {
                $allPossiblePairs["$i-$j"] = ['post_id' => $i, 'user_id' => $j];
            }
        }

        $existingPairs = DB::table('upvote_downvotes')->select('post_id', 'user_id')->get();

        foreach ($existingPairs as $pair) {
            unset($allPossiblePairs["{$pair->post_id}-{$pair->user_id}"]);
        }

        if (empty($allPossiblePairs)) {
            throw new Exception("All possible pairs are already used");
        }

        $selectedPair = $this->faker->randomElement($allPossiblePairs);

        return [
            "is_upvoted" => $this->faker->numberBetween(0, 1),
            "post_id" => $selectedPair['post_id'],
            "user_id" => $selectedPair['user_id'],
            'created_at' => $this->faker->dateTimeBetween("-1month", "now"),
            'updated_at' => $this->faker->dateTimeBetween("-1month", "now"),
        ];
    }
}
