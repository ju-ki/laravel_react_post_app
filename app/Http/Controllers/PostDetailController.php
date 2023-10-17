<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostViewRequest;
use App\Models\Post;
use App\Models\UpvoteDownvote;
use App\Services\PostDetailService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PostDetailController extends Controller
{
    protected $postDetailsService;

    public function __construct(PostDetailService $postDetailService)
    {
        $this->postDetailsService = $postDetailService;
    }
    //
    public function show(string $id, PostViewRequest $request)
    {
        return $this->postDetailsService->getPostDetails($id, $request);
    }
}
