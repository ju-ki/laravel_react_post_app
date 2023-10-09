<?php

namespace App\Providers;

use App\Services\CategoryService;
use App\Services\PostService;
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

        // $this->app->singleton(CategoryService::class, function ($app) {
        //     return new CategoryService();
        // });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
