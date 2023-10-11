<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    // use RefreshDatabase;  // テスト前後でデータベースをリセット

    protected $latestPosts;

    protected function setUp(): void
    {
        parent::setUp();

        //最新の5件
        $this->latestPosts = Post::latest()->limit(5)->get();
    }

    /**
     * 正常な値と正常な形でJSONが返ってくるかの確認
     *
     * @return void
     */
    public function test_expected_value()
    {
        $response = $this->get('/api/home');  // 実際のルートに置き換えてください

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'latestPosts',
            'popularPosts'
        ]);
    }

    /**
     * 正常な値と正常な形でJSON,期待通りのcolumnが返ってくるかの確認
     *
     * @return void
     */
    public function test_home_method_returns_expected_response()
    {
        $response = $this->get('/api/home');  // 実際のルートに置き換えてください

        $response->assertStatus(200);


        $response->assertJsonStructure([
            "latestPosts" => [
                "*" => [
                    "id",
                    "title",
                    "body",
                    "image",
                    "user_id",
                    "created_at",
                    "updated_at",
                    "days_ago",
                    "image_path"
                ]
            ],
            "popularPosts" => [
                "*" => [
                    "id",
                    "title",
                    "body",
                    "image",
                    "user_id",
                    "created_at",
                    "updated_at"
                ]
            ]
        ]);
    }

    /**
     * api/homeエンドポイントにPOSTメソッドをサポートしていない
     *
     * @return void
     */
    public function test_home_method_returns_error_for_invalid_parameters()
    {
        $response = $this->post('/api/home');
        $response->assertStatus(405);
    }

    
}
