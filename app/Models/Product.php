<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name_en',
        'name_am',
        'name_or',
        'description_en',
        'description_am',
        'description_or',
        'full_description_en',
        'full_description_am',
        'full_description_or',
        'category',
        'price',
        'image',
        'gallery'
    ];

    protected $casts = [
        'gallery' => 'array',
    ];
}
