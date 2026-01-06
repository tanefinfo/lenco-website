<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Festival extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_am',
        'title_or',
        'description_en',
        'description_am',
        'description_or',
        'location',
        'type',
        'date',
        'image',
        'gallery',
        'spotlight',
        'link',
    ];

    protected $casts = [
        'date' => 'date',
        'gallery' => 'array', // JSON to array
    ];
}
