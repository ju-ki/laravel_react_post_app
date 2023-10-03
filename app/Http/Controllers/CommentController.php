<?php

namespace App\Http\Controllers;

use App\Events\CommentPostedEvent;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Notifications\NewCommentNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
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
    public function store(Request $request)
    {
        $user = $request->user()->id;
        $comment = new Comment;
        $comment->body = $request["body"];
        $comment->post_id = $request["id"];
        $comment->user_id = $user;
        $comment->save();

        $post = Post::find($request["id"]);
        Log::info($post);
        $post->user->notify(new NewCommentNotification($comment));
        Log::info($post->user);
        Log::info($post->user->notify(new NewCommentNotification($comment)));

        return $comment;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comments = Comment::where("post_id", $id)->with("user")->get();
        foreach ($comments as $comment) {
            $comment->user_name = User::where("id", $comment->user_id)->get(["name"]);
        }
        return $comments;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        Comment::where("id", $request->commentId)->update(["body" => $request->body]);
        $comment = Comment::where("id", $request->commentId)->first();
        return response()->json($comment, 201);
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
}
