<?php

namespace Tests\Feature;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostCreationTest extends TestCase
{
    public function test_successful_post_creation()
    {
        $user = User::find(1);
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => "Sample Title",
            "body" => "Sample Body",
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("posts", ["title" => "Sample Title"]);
    }

    public function test_post_creation_with_num_title()
    {
        $user = User::find(1);
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => 1111, //数値は期待値ではない
            "body" => "Sample Body"
        ]);


        $response->assertStatus(422);
    }

    public function test_post_creation_with_num_body()
    {
        $user = User::find(1);
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => "Sample Title",
            "body" => 5235252 //数値は期待値ではない
        ]);

        $response->assertStatus(422);
    }

    public function test_post_creation_with_empty_title()
    {
        $user = User::find(1);
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => "", //空文字は期待値ではない
            "body" => "Sample Body"
        ]);

        $response->assertStatus(422);
    }

    public function test_post_creation_with_empty_body()
    {
        $user = User::find(1);
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => "Sample Title",
            "body" => "" //空文字は期待値ではない
        ]);

        $response->assertStatus(422);
    }

    public function test_post_creation_without_unauthenticated()
    {
        $response = $this->postJson("/api/create", [
            "title" => "Sample Title",
            "body" => "Sample Body"
        ]);


        $response->assertStatus(401);
    }


    public function test_post_creation_with_image()
    {
        Storage::fake('public'); // 仮想のファイルシステムを使用
        Carbon::setTestNow(Carbon::create(2023, 10, 10, 12, 0, 0));
        $user = User::find(1);
        $file = UploadedFile::fake()->image('test_image.jpg');

        // `postJson` ではなく `post` メソッドを使用
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => "Sample Title",
            "body" => "Sample Body",
            "image" => $file  // ファイルをこのように追加
        ]);

        $response->assertStatus(201);

        $this->assertCount(1, Storage::disk('public')->files('images'));
    }
}
