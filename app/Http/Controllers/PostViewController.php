<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Requests\PostViewRequest;
use App\Models\PostView;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostViewController extends Controller
{
    //
    public function addView($id, PostViewRequest $request)
    {
        $recentView = DB::table('post_views')
            ->where("ip_address", $request->ip())
            ->where("user_agent", $request->header('User-Agent'))
            ->where("post_id", $id)
            ->where('created_at', '>', Carbon::now()->subDay())
            ->first();
        if (!$recentView) {
            DB::table('post_views')->insert([
                'ip_address' => $request->ip(),
                'user_agent' => $request->header('User-Agent'),
                'post_id' => $id,
                'user_id' => Auth::user()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        return $recentView;
    }

    public function getViewCount($id)
    {
        return DB::table('post_views')->where('post_id', $id)->count();
    }
}
