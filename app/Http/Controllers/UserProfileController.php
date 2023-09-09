<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserProfileController extends Controller
{
    //
    public function getProfileInfo()
    {
        $user = Auth::user();
        $upVotedPosts = $user->upvotes->map(function ($upvote) {
            return $upvote->post;
        });
        Log::info($upVotedPosts);
        $createdPosts = $user->posts;
        return response()->json([
            "user" => $user,
            "upVotedPosts" => $upVotedPosts,
            "createdPosts" => $createdPosts
        ]);
    }
}
