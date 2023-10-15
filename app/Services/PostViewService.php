<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class PostViewService
{
    public function getViewCount(string $id)
    {
        $viewCount = DB::table("post_views")
            ->where("post_id", $id)->count();
        return $viewCount;
    }
}
