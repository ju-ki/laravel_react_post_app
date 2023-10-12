<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use App\Services\CategoryService;
use App\Services\PostService;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;
use Throwable;

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
        if (isset($data["image"]) && $data["image"] instanceof UploadedFile) {
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
