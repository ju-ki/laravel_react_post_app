<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\PasswordResetToken;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;

class AuthController extends Controller
{
    //
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"])
        ]);

        $token = $user->createToken("main")->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;

        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();

        $token = $user->createToken("main")->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        try {
            return response([
                'success' => true
            ]);
        } catch (Exception $err) {
            return response([
                'success' => false
            ]);
        }
    }

    /**
     * パスワードのリセットのリンクを送るコード
     *
     * @param Request $request
     * @return void
     */
    public function passwordForgot(Request $request)
    {
        $request->validate([
            "email" => "required|email",
        ]);
        Log::info($request);
        $user = User::where("email", $request['email'])->first();
        Log::info($user);
        if (empty($user)) {
            return response()->json([
                "message" => "Not exists"
            ], 422);
        }
        $token = Password::broker()->createToken($user);
        $now = Carbon::now();

        $expire_at = $now->addHour(1)->toDateTimeString();
        PasswordResetToken::created([
            "email" => $request["email"],
            "token" => $token
        ]);

        $user->sendPasswordResetNotification($token);

        return response()->json([
            "message" => "Exist"
        ], 200);
    }


    public function updatePassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', RulesPassword::min(8)],
        ]);

        $user = User::where('email', $request['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'ユーザーが存在しません'], 404);
        }

        // Laravelの組み込みのパスワードリセット機能を使用してトークンを確認
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();
            }
        );

        session(['has_reset_password' => true]);

        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => 'パスワードの更新に成功しました']);
        } else {
            return response()->json(['message' => trans($status)], 500);
        }
    }


    public function profile(Request $request)
    {
        return Auth::user();
    }


    public function fetchUserId()
    {
        return Auth::user()->id;
    }
}
