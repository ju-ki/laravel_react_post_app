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
            // $post = Post::create([
            //     "title" => $data["title"],
            //     "body" => $data["body"],
            //     "image" => $data["image"],
            //     "user_id" => $request->user()->id
            // ]);
            $user = $request->user()->id;
            $post = new Post;
            $post->title = $request['title'];
            $post->body = $request['body'];
            // $post->image = $request['image'];
            $post->user_id = $user;
            // $post->image = $data->input("image"); // 画像の保存には追加の処理が必要かもしれません
            $post->save();

            // 各カテゴリを保存し、postとリンクします
            $category_ids = [];
            foreach ($request->categories as $categoryData) {
                // Categoryモデルにデータを保存
                $category = Category::firstOrCreate(['name' => $categoryData['value']]);
                $category_ids[] = $category->id;
            }

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
    public function show(string $id)
    {
        //
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
        if (isset($data["categories"]) && count($data["categories"]) > 0) {
            foreach ($data as $d) {
                $category = Category::firstOrCreate([
                    "name" => $d["categories"]["value"]
                ]);
                $data->categories()->attach($category->id);
            }
        }
    }
}
