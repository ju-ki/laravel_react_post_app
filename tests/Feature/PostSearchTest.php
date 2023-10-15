<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostSearchTest extends TestCase
{
    /**
     * キーワード検索のテスト
     */
    public function test_search_by_keyword()
    {
        $response = $this->get("/api/search/word/test");
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

    /**
     * カテゴリの検索テスト
     *
     * @return void
     */
    public function test_search_by_category()
    {
        $response = $this->get("/api/search/category/minus");
        $response->assertStatus(200);

        $response->assertJsonCount(2, "matchedPosts.data");
        $response->assertJson([
            "matchedPosts" => [
                "total" => 2
            ]
        ]);
    }


    /**
     * サポートしていないメソッドでのテスト
     *
     * @return void
     */
    public function test_by_keyword_with_invalid_method()
    {
        $response = $this->post("/api/search/word/test");
        $response->assertStatus(405);
    }

    /**
     * サポートしていないメソッドでのテスト
     *
     * @return void
     */
    public function test_by_category_with_invalid_method()
    {
        $response = $this->post("/api/search/category/test");
        $response->assertStatus(405);
    }

    /**
     * 検索結果が0のテスト
     *
     * @return void
     */
    public function test_search_by_nonexistent_word()
    {
        $response = $this->get("/api/search/word/searchWord!!");
        $response->assertStatus(200);;
        $response->assertJsonCount(0, "matchedPosts.data");
        $response->assertJson([
            "matchedPosts" => [
                "total" => 0
            ]
        ]);
    }

    /**
     * 検索結果が0のテスト
     *
     * @return void
     */
    public function test_search_by_nonexistent_category()
    {
        $response = $this->get("/api/search/category/searchWord!!");
        $response->assertStatus(200);;
        $response->assertJsonCount(0, "matchedPosts.data");
        $response->assertJson([
            "matchedPosts" => [
                "total" => 0
            ]
        ]);
    }
}
