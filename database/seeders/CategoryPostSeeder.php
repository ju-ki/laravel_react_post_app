<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // PostとCategoryのダミーデータの作成

        Post::all()->each(function ($post) {
            $categories = Category::inRandomOrder()->take(rand(1, 5))->pluck('id');
            $post->categories()->attach($categories);
        });
    }
}
