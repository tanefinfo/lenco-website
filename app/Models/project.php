<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'category_id',
        'slug',
        'lang',
        'title',
        'description',
        'thumbnail',
        'sort_order',
    ];

    /**
     * Category relationship
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Scope by language
     */
    public function scopeLang($query, string $lang)
    {
        return $query->where('lang', $lang);
    }
}
