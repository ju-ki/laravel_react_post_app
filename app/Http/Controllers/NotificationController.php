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
        $notifications = NotificationModel::with("user")
            ->where("user_id", $userId)
            ->where("read_at", "=", null)
            ->orderBy("created_at", "desc")
            ->get();

        $notifications->transform(function ($notification) {
            $notification->time_ago = $notification->created_at->diffForHumans();
            return $notification;
        });
        return $notifications;
    }

    public function read()
    {
        $userId = Auth::user()->id;
        NotificationModel::where('user_id', $userId)->update([
            "read_at" => now()
        ]);

        return "ok";
    }
}
