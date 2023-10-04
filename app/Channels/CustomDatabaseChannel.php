<?php

namespace App\Channels;


use Illuminate\Notifications\Notification;

use Illuminate\Notifications\Channels\DatabaseChannel as BaseDatabaseChannel;
use Illuminate\Notifications\DatabaseNotification;

class CustomDatabaseChannel extends BaseDatabaseChannel
{
    public function send($notifiable, Notification $notification)
    {
        return DatabaseNotification::create($this->buildPayload($notifiable, $notification));
    }

    protected function buildPayload($notifiable, Notification $notification)
    {
        $data = is_array($notification->toDatabase($notifiable))
            ? $notification->toDatabase($notifiable)
            : $notification->toDatabase($notifiable)->data;

        return array_merge([
            'id' => $notification->id,
            'type' => get_class($notification),
            'data' => json_encode($data),
            'read_at' => null,
            'notifiable_id' => $notifiable->getKey(),
            'notifiable_type' => get_class($notifiable)
        ], $data);
    }
}
