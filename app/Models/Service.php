<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title_en',
        'title_am',
        'title_or',
        'description_en',
        'description_am',
        'description_or',
        'icon',
        'features',
        'order',
    ];

    protected $casts = [
        'features' => 'array',
    ];
}
