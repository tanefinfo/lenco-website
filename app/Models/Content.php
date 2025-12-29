<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'type',
        'slug',
        'lang',
        'title',
        'description',
        'body',
        'image_url',
        'video_url',
        'category',
        'year',
        'extra',
    ];

    protected $casts = [
        'extra' => 'array',
    ];
}

