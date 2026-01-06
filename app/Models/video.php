<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'type',       // music-video | movie-trailer
        'slug',
        'lang',
        'title',
        'description',
        'embed_url',
        'sort_order',
    ];

    /**
     * Scope by language
     */
    public function scopeLang($query, string $lang)
    {
        return $query->where('lang', $lang);
    }

    /**
     * Scope by type
     */
    public function scopeType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
