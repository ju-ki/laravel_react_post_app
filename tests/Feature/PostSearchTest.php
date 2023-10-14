<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostSearchTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_search_by_keyword()
    {
        $response = $this->post("/api/search/word/test");
        $response->assertStatus(200);
        //ページごとのテスト
        $response->assertJsonCount(5, "matchedPosts.data");
        $response->assertJson([
            "matchedPosts" => [
                //ここは毎回変えないといけないかもしれない
                "total" => 12
            ]
        ]);
    }


    public function
}
