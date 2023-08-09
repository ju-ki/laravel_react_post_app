<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Post;
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
            // $post->image = $request['image'];
            $post->user_id = $user;
            $post->save();

            // 各カテゴリを保存し、postとリンクします
            $category_ids = $this->createCategory($data);

            // PostとCategoryの間のリレーションシップを保存
            $post->categories()->sync($category_ids);

            return "success";
        } catch (Throwable $e) {
            // return $data;
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $allPosts = Post::get();
        return $allPosts;
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
    public function update(Request $request, string $id)
    {
        //
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
}
