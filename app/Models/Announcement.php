<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $appends = ["date"];

    public function reads()
    {
        return $this->hasMany(AnnouncementRead::class, "announcement_id", "id");
    }

    // public function getUrlAttribute()
    // {
    //     return route("announcement.show", $this->id);
    // }

    public function getDateAttribute()
    {
        return $this->created_at->format('m月d日');
    }
}
