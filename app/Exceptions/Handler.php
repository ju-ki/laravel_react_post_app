<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        // if ($request->expectsJson()) {
        //     \Log::error($exception->getMessage());

        //     return response()->json([
        //         "error" => "エラーが発生しました"
        //     ], 500); // エラー時のステータスコード
        // }

        // return parent::render($request, $exception);
        if ($exception instanceof HttpResponseException) {
            return response()->json(['message' => 'バリデーションエラーが解決しました'], 422);
        }

        return parent::render($request, $exception);
    }
}
