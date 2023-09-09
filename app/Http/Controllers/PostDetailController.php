<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\UpvoteDownvote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostDetailController extends Controller
{
    //
    public function getPostDetail(string $id)
    {
        $userId = Auth::user()->id;
        $post = Post::with("categories")->where("id", $id)->first();
        $post->day_ago = Carbon::parse($post->created_at)->diffForHumans();
        $viewCount = DB::table("post_views")->where("post_id", $id)->count();
        $upvoteCount = UpvoteDownvote::where("post_id", $id)->where("is_upvoted", 1)->count();
        $isUpVoted = UpvoteDownvote::where("post_id", $id)->where("user_id", $userId)->value("is_upvoted");
        return response()->json([
            "post" => $post,
            "viewCount" => $viewCount,
            "upvoteCount" => $upvoteCount,
            "isUpVoted" => $isUpVoted
        ]);
    }
}
