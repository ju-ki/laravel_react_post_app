<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\UpvoteDownvote;
use App\Notifications\NewUpvoteNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpvoteDownvoteController extends Controller
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
    public function store(Request $request, string $id)
    {
        $userId = Auth::user()->id;
        $upvotedValue = filter_var($request->is_upvoted, FILTER_VALIDATE_BOOLEAN);
        Log::info($upvotedValue);
        $upvoted = UpvoteDownvote::updateOrCreate(
            ['user_id' => $userId, 'post_id' => $id],
            ['is_upvoted' => filter_var($request->is_upvoted, FILTER_VALIDATE_BOOLEAN)]
        );
        if ($upvotedValue) {
            $post = Post::find($id);
            $postUserId = $post->user_id;
            $post->user->notify(new NewUpvoteNotification($upvoted, $postUserId));
        }
        return $id;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $count = UpvoteDownvote::where("post_id", $id)->where("is_upvoted", 1)->count();
        return $count;
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
