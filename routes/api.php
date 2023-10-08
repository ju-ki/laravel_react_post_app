<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostDetailController;
use App\Http\Controllers\PostViewController;
use App\Http\Controllers\UpvoteDownvoteController;
use App\Http\Controllers\UserProfileController;
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
    Route::get('/users/profile-with-activities', [UserProfileController::class, 'getProfileInfo']);
    Route::post('/create', [PostController::class, 'store']);
    Route::post('/post/edit/{id}', [PostController::class, 'update']);
    Route::post('/comment/{id}', [CommentController::class, 'store']);
    Route::patch('/comment/{id}/update', [CommentController::class, "edit"]);
    Route::post('/posts/{id}/upvote/', [UpvoteDownvoteController::class, 'store']);
    Route::get("/user/id", [AuthController::class, "fetchUserId"]);
    Route::get("/user/notification", [NotificationController::class, "show"]);
    Route::patch("/user/notification/markAsRead", [NotificationController::class, "read"]);
    Route::get("/announcement/list", [AnnouncementController::class, "list"]);
});


Route::get("/home", [PostController::class, "home"]); //Top画面のAPI
Route::get('/posts/{id}/upvote/count', [UpvoteDownvoteController::class, 'show']);
Route::get('/post/{id}/detail', [PostDetailController::class, "getPostDetail"]);
Route::get("/views/{id}", [PostViewController::class, "addView"])->middleware('auth:sanctum', 'optional');
Route::get("/views/counter/{id}", [PostViewController::class, "getViewCount"]);
Route::get("/post/{id}", [PostController::class, "show"]);
Route::get("/comment/{id}", [CommentController::class, "show"]);
Route::get("/category", [CategoryController::class, "fetchCategory"]);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post("/search/word/{word}", [PostController::class, "searchResultByKeyword"]);
Route::get("/search/all", [PostController::class, "searchAllResults"]);
Route::post("/search/category/{cat}", [PostController::class, "searchResultByCategory"]);
