<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Throwable;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function home()
    {
        $latestPosts = Post::orderBy("created_at", "desc")->limit(5)->get();
        $latestPosts->transform(function ($post) {
            $post->days_ago = Carbon::parse($post->created_at)->diffForHumans();
            $post->image_path = asset("storage/images/" . $post->image);
            return $post;
        });

        $popularPosts = Post::withCount([
            'upvoteDownvotes' => function ($query) {
                $query->where("is_upvoted", 1);
            },
            "postViews"
        ])->orderByDesc("upvote_downvotes_count")
            ->orderByDesc("post_views_count")
            ->limit(5)
            ->get();
        return response()->json([
            "latestPosts" => $latestPosts,
            "popularPosts" => $popularPosts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        //
        try {
            $data = $request->validated();
            $user = $request->user()->id;
            $post = new Post;
            $post->title = $request['title'];
            $post->body = $request['body'];
            $post->image = $this->storeImage($request);
            $post->user_id = $user;
            $post->save();

            // 各カテゴリを保存し、postとリンクします
            $category_ids = $this->createCategory($data);

            // PostとCategoryの間のリレーションシップを保存
            $post->categories()->sync($category_ids);

            return "success";
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with("categories")->where("id", $id)->first();
        $post->day_ago = Carbon::parse($post->created_at)->diffForHumans();
        // $post->image_path = asset("storage/images/" . $post->image);
        return $post;
    }


    public function searchResultByKeyword(string $word = null)
    {
        if (!$word) {
            return Post::all();
        }
        //キーワードによる部分一致検索
        $matchedPosts = Post::where("title", "like", "%" . $word . "%")->paginate(5);
        return $matchedPosts;
    }

    public function searchResultByCategory(string $cat)
    {
        $matchedPosts = Post::whereHas("categories", function ($query) use ($cat) {
            $query->select("name")->where("name", $cat);
        })->paginate(5);
        return $matchedPosts;
    }


    public function searchAllResults()
    {
        return Post::paginate(5);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id)
    {
        //TODO:update
        $data = $request->validated();
        $post = Post::find($id);
        $post->update([
            "title" => $data["title"],
            "body" => $data["body"],
            "image" => $this->storeImage($request)
        ]);
        // 各カテゴリを保存し、postとリンクします
        $category_ids = $this->createCategory($data);

        // PostとCategoryの間のリレーションシップを保存
        $post->categories()->sync($category_ids);
        return "success";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function createCategory($data)
    {
        $category_ids = [];
        foreach ($data["categories"] as $categoryData) {
            // Categoryモデルにデータを保存
            $category = Category::firstOrCreate(['name' => $categoryData['value']]);
            $category_ids[] = $category->id;
        }
        return $category_ids;
    }


    public function storeImage($data)
    {
        $original = $data->file("image")->getClientOriginalName();
        $name = date("Ymd_His") . '_' . $original;
        $data->file("image")->move("storage/images", $name);
        return $name;
    }

    public function getPosts(string $id)
    {
        $user = User::findOrFail($id);
        $posts = $user->posts;
        return $posts;
    }

    public function getUpvotes(string $id)
    {
        $user = User::findOrFail($id);
        $posts = $user->upvotes;
        return $posts;
    }
}
