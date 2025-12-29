<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title_en',
        'title_am',
        'title_or',
        'description_en',
        'description_am',
        'description_or',
        'type',
        'location',
        'date',
        'time',
        'image',
        'gallery',
    ];

    protected $casts = [
        'gallery' => 'array',
        'date' => 'date',
    ];
}
