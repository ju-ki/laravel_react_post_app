<?php

namespace App\Models;

use App\Models\User;
use App\Models\Category;
use Attribute;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ["title", "body", "user_id", "image"];

    protected function getCreatedAt()
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->diffForHumans()
        );
    }

    public function getDaysAgoAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function getImagePathAttribute()
    {
        return asset("storage/images/" . $this->image);
    }
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function postViews()
    {
        return $this->hasMany(PostView::class);
    }

    public function upvoteDownvotes()
    {
        return $this->hasMany(UpvoteDownvote::class);
    }
}
