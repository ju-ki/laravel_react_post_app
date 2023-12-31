<?php

namespace App\Providers;

use App\Services\CategoryService;
use App\Services\PostDetailService;
use App\Services\PostService;
use App\Services\PostViewService;
use App\Services\UpVoteDownVoteService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->singleton(PostService::class, function ($app) {
            return new PostService();
        });

        $this->app->singleton(CategoryService::class, function ($app) {
            return new CategoryService();
        });

        $this->app->singleton(PostViewService::class, function ($app) {
            return new PostViewService();
        });

        $this->app->singleton(PostDetailService::class, function ($app) {
            $upvoteDownService = $app->make(UpVoteDownVoteService::class);
            $postService = $app->make(PostService::class);
            $postViewService = $app->make(PostViewService::class);
            return new PostDetailService($upvoteDownService, $postService, $postViewService);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
