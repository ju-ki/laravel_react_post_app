<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Storage;

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

    /**
     * 画像を保存する
     *
     * @param 画像データ
     * @return 画像のパス
     */
    public function storeImage($image)
    {
        $original = $image->getClientOriginalName();
        $name = date("Ymd_His") . '_' . $original;
        $path = Storage::disk('public')->putFileAs('images', $image, $name);

        return basename($path);
    }

    /**
     * キーワードを元に投稿を取得
     *
     * @param string|null $word 検索キーワード
     * @return void
     */
    public function searchByKeyword(string $word = null)
    {
        if (!$word) {
            return Post::paginate(5);
        }

        $matchedPosts = Post::where("title", "like", "%" . $word . "%")
            ->orderBy("created_at", "desc")
            ->paginate(5);
        return $matchedPosts;
    }


    public function searchByCategory(string $cat)
    {
        $matchedPosts = Post::whereHas("categories", function ($query) use ($cat) {
            $query->select("name")->where("name", $cat);
        })->paginate(5);
        return $matchedPosts;
    }
}
