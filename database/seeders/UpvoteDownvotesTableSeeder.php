<?php

namespace Database\Seeders;

use App\Models\UpvoteDownvote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UpvoteDownvotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UpvoteDownvote::factory(512)->create();
    }
}
