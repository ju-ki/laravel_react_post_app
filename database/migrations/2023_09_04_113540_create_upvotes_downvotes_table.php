<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('upvotes_downvotes', function (Blueprint $table) {
            $table->id();
            $table->boolean("is_upvoted");
            $table->foreignIdFor(Post::class, "post_id");
            $table->foreignIdFor(User::class, "user_id");
            $table->unique(['user_id', 'post_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('upvotes_downvotes');
    }
};
