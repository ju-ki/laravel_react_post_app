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
    /**
     * 新規会員登録
     *
     * @param SignupRequest $request
     * @return void
     */
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


    /**
     * ログイン
     *
     * @param LoginRequest $request
     * @return void
     */
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

        $user = $this->profile();;

        $token = $user->createToken("main")->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    /**
     * ログアウト
     *
     * @param Request $request
     * @return void
     */
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
        $user = User::where("email", $request['email'])->first();
        if (empty($user)) {
            return response()->json([
                "message" => "This email is invalid"
            ], 422);
        }
        $token = Password::broker()->createToken($user);

        PasswordResetToken::created([
            "email" => $request["email"],
            "token" => $token
        ]);

        $user->sendPasswordResetNotification($token);

        return response()->json([
            "message" => "Exist"
        ], 200);
    }


    /**
     * パスワードの更新
     *
     * @param Request $request
     * @return void
     */
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
            return response()->json(['message' => 'パスワードの更新に成功しました'], 200);
        } else {
            return response()->json(['message' => trans($status)], 500);
        }
    }

    /**
     * ログイン情報
     *
     */
    public function profile()
    {
        return Auth::user();
    }


    /**
     * ログインしているユーザーIDを取得wosyutoku
     *
     */
    public function fetchUserId()
    {
        return Auth::user()->id;
    }
}
