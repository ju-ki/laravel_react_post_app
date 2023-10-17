<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

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


    public function passwordForgot(Request $request)
    {
        // $data = $request->validated();
        $status = Password::sendResetLink($request->only("email"));

        return trans($status);
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
