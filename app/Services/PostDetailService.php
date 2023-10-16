<?php

namespace App\Services;

use App\Http\Requests\PostViewRequest;
use Illuminate\Support\Facades\Auth;

class PostDetailService
{
    protected $upvoteDownService;
    protected $postViewService;
    protected $postService;

    public function __construct(
        UpVoteDownVoteService $upvoteDownService,
        PostService $postService,
        PostViewService $postViewService
    ) {
        $this->upvoteDownService = $upvoteDownService;
        $this->postService = $postService;
        $this->postViewService = $postViewService;
    }

    public function getPostDetails(string $id, PostViewRequest $request)
    {
        $isUpVoted = 0;
        if (Auth::user()) {
            $userId = Auth::user()->id;
            $isUpVoted = $this->upvoteDownService->getIsUpVoted($id, $userId);
        }

        $upVoteCount = $this->upvoteDownService->getUpVoteCount($id);
        $postDetails = $this->postService->getPostDetailsWithCategory($id);
        $postViewCount = $this->postViewService->getViewCount($id);
        $this->postViewService->updateViewCount($id, $request);
        return response()->json([
            "isUpVoted" => $isUpVoted,
            "viewCounter" => $postViewCount,
            "upVotedCount" => $upVoteCount,
            "postDetails" => $postDetails
        ], 200);
    }
}
