<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
    /**
     * 最新の投稿を取得する
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLatestPosts()
    {
        $latestPosts = Post::latest()
            ->limit(5)
            ->get()
            ->map(function ($post) {
                $post->days_ago = $post->daysAgo;
                $post->image_path = $post->imagePath;
                return $post;
            });
        return $latestPosts;
    }

    /**
     * 人気の投稿を取得する
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPopularPosts()
    {
        $popularPosts = Post::withCount([
            "upvoteDownvotes" => function ($query) {
                $query->where("is_upvoted", 1);
            },
            "postViews"
        ])
            ->orderByDesc("post_views_count")
            ->orderByDesc("upvote_downvotes_count")
            ->limit(5)
            ->get();
        return $popularPosts;
    }


    public function storeImage($image)
    {
        $original = $image->getClientOriginalName();
        $name = date("Ymd_His") . '_' . $original;
        $image->move("public/storage/images", $name);
        return $name;
    }
}
