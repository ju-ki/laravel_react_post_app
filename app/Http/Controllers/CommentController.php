<?php

namespace App\Http\Controllers;

use App\Events\CommentPostedEvent;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

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
        CommentPostedEvent::dispatch($comment);
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
}
