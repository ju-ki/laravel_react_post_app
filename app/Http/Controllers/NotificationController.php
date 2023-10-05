<?php

namespace App\Http\Controllers;

use App\Models\Notification as NotificationModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    //
    public function show()
    {
        $userId = Auth::user()->id;
        Log::info($userId);
        $notification = NotificationModel::where("user_id", $userId)->get();
        return $notification;
    }
}
