<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class PostCreationTest extends TestCase
{
    public function test_successful_post_creation()
    {
        $user = User::find(1);
        $file = UploadedFile::fake()->image('background.jpg');
        $response = $this->actingAs($user)->post("/api/create", [
            "title" => "Sample Title",
            "body" => "Sample Body",
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("posts", ["title" => "Sample Title"]);
    }
}
