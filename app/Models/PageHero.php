<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageHero extends Model
{
    protected $fillable = ['page', 'lang', 'title', 'subtitle'];

    /**
     * Scope by language
     */
    public function scopeLang($query, string $lang)
    {
        return $query->where('lang', $lang);
    }

    /**
     * Scope by page
     */
    public function scopePage($query, string $page)
    {
        return $query->where('page', $page);
    }
}

