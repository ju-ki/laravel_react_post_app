<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostViewController;
use App\Http\Controllers\UpvoteDownvoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/create', [PostController::class, 'store']);
    Route::post('/post/edit/{id}', [PostController::class, 'update']);
    Route::post('/comment/{id}', [CommentController::class, 'store']);
    Route::post('/posts/{id}/upvote/', [UpvoteDownvoteController::class, 'store']);
});

Route::get('/posts/{id}/upvote/count', [UpvoteDownvoteController::class, 'show']);
Route::get("/views/{id}", [PostViewController::class, "addView"])->middleware('auth:sanctum', 'optional');
Route::get("/views/counter/{id}", [PostViewController::class, "getViewCount"]);
Route::get("/home", [PostController::class, "home"]);
Route::get("/post/{id}", [PostController::class, "show"]);
Route::get("/comment/{id}", [CommentController::class, "show"]);
Route::get("/category", [CategoryController::class, "fetchCategory"]);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get("/user/{id}/posts", [PostController::class, "getPosts"]);
Route::get("/user/{id}/upvotes", [PostController::class, "getUpvotes"]);
