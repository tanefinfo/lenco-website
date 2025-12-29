<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Festival extends Model
{
        protected $fillable = [
        'title',
        'location',
        'year',
        'dates',
        'image',
        'type',
        'spotlight',
        'description',
        'link',
        'language',
    ];

}
