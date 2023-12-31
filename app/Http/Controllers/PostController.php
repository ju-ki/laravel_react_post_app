<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use App\Services\CategoryService;
use App\Services\PostService;
use Carbon\Carbon;

class PostController extends Controller
{
    protected $postService;
    protected $categoryService;

    public function __construct(PostService $postService, CategoryService $categoryService)
    {
        $this->postService = $postService;
        $this->categoryService = $categoryService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function home()
    {
        $latestPosts = $this->postService->getLatestPosts();
        $popularPosts = $this->postService->getPopularPosts();


        return response()->json([
            "latestPosts" => $latestPosts,
            "popularPosts" => $popularPosts
        ], 200);
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
        $data = $request->validated();
        $data["user_id"] = $request->user()->id;
        if (isset($data["image"]) && $data["image"]) {
            $data["image"] = $this->postService->storeImage($data["image"]);
        }

        $post = Post::create($data);
        $post->save();
        if (isset($data["categories"]) && !empty($data["categories"])) {
            $categoryIds = $this->categoryService->createCategory($data);
            $post->categories()->sync($categoryIds);
        }
        return response()->json([
            "message" => "投稿に作成に成功しました"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with("categories")->where("id", $id)->first();
        $post->day_ago = Carbon::parse($post->created_at)->diffForHumans();
        $post->image_path = $post->imagePath;
        return $post;
    }


    public function searchByKeyword(string $word = null)
    {
        $matchedPosts = $this->postService->searchByKeyword($word);
        return response()->json([
            "matchedPosts" => $matchedPosts
        ], 200);
    }

    public function searchByCategory(string $cat)
    {
        $matchedPosts = $this->postService->searchByCategory($cat);
        return response()->json([
            "matchedPosts" => $matchedPosts
        ], 200);
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
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                "message" => "Post not Found"
            ], 404);
        }
        $data = $request->validated();

        if (isset($data["image"]) && data["image"]) {
            $data["image"] = $this->postService->storeImage($data["image"]);
        }

        $post->update($data);

        if (isset($data["categories"]) && !empty($data["categories"])) {
            $category_ids = $this->categoryService->createCategory($data);
            $post->categories()->sync($category_ids);
        }

        return response()->json(["message" => "記事の更新に成功しました"], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getPosts(string $id)
    {
        $user = User::findOrFail($id);
        $posts = $user->posts;
        $posts->day_ago = Carbon::parse($posts->created_at)->diffForHumans();
        return $posts;
    }

    public function getUpvotes(string $id)
    {
        $user = User::findOrFail($id);
        $posts = $user->upvotes;
        $posts->day_ago = Carbon::parse($posts->created_at)->diffForHumans();
        return $posts;
    }
}
