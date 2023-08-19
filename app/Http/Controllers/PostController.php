<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
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
        $allPosts = Post::orderBy("created_at", "desc")->limit(10)->get();
        $allPosts->transform(function ($post) {
            $post->days_ago = Carbon::parse($post->created_at)->diffForHumans();
            $post->image_path = asset("storage/images/" . $post->image);
            return $post;
        });
        return $allPosts;
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
        $post->image_path = asset("storage/images/" . $post->image);
        return $post;
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
}
