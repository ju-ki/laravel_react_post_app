<?php

namespace App\Http\Controllers;

use App\Models\UpvoteDownvote;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserProfileController extends Controller
{
    //
    public function getProfileInfo()
    {
        $user = Auth::user();
        Log::info($user);
        $upVotedPostsPaginator = $user->upvotes()->paginate(5);

        $upVotedPosts = $upVotedPostsPaginator->getCollection()->map(function ($upvote) {
            $totalLikes = UpvoteDownvote::where('post_id', $upvote->post_id)
                ->where('is_upvoted', 1)
                ->count();

            $post = $upvote->post;
            $post->total_likes = $totalLikes;
            return $post;
        });

        $upVotedPostsPaginator->setCollection($upVotedPosts);


        $createdPosts = $user->posts()->paginate(5);
        $createdPosts->transform(function ($post) {
            $post->days_ago = Carbon::parse($post->created_at)->diffForHumans();
            return $post;
        });
        $upVotedPosts->transform(function ($post) {
            $post->days_ago = Carbon::parse($post->created_at)->diffForHumans();
            return $post;
        });

        return response()->json([
            "user" => $user,
            "upVotedPosts" => $upVotedPostsPaginator,
            "createdPosts" => $createdPosts,
        ]);
    }
}
