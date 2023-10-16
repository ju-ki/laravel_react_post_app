<?php

namespace App\Services;

use App\Models\UpvoteDownvote;
use Illuminate\Support\Facades\Auth;

class UpVoteDownVoteService
{

    public function getUpVoteCount(string $id)
    {
        $upvoteCount = UpvoteDownvote::where("post_id", $id)->where("is_upvoted", 1)->count();
        return $upvoteCount;
    }


    public function getIsUpVoted(string $id, string $userId)
    {
        if (!Auth::user()) {
            return 0;
        }
        $userId = Auth::user()->id;
        $isUpVoted = UpvoteDownvote::where("post_id", $id)->where("user_id", $userId)->value("is_upvoted");
        return $isUpVoted;
    }
}
