<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewUpvoteNotification extends Notification
{
    use Queueable;

    protected $upvoted;
    protected $postUserId;

    /**
     * Create a new notification instance.
     */
    public function __construct($upvoted, $postUserId)
    {
        //
        $this->upvoted = $upvoted;
        $this->postUserId = $postUserId;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    public function toDatabase($notifiable)
    {
        return [
            "title" => "あなたの投稿にいいねが押されました",
            "body" => "",
            "post_id" => $this->upvoted->post_id,
            "user_id" => $this->postUserId
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
