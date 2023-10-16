<?php

namespace App\Services;


use App\Http\Requests\PostViewRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostViewService
{
    public function getViewCount(string $id)
    {
        $viewCount = DB::table("post_views")
            ->where("post_id", $id)->count();
        return $viewCount;
    }


    public function updateViewCount(string $postId, PostViewRequest $request)
    {
        $recentView = DB::table('post_views')
            ->where("ip_address", $request->ip())
            ->where("user_agent", $request->header('User-Agent'))
            ->where("post_id", $postId)
            ->where('created_at', '>', Carbon::now()->subDay())
            ->first();
        if (!$recentView) {
            DB::table('post_views')->insert([
                'ip_address' => $request->ip(),
                'user_agent' => $request->header('User-Agent'),
                'post_id' => $postId,
                'user_id' => Auth::user() ? Auth::user()->id : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
