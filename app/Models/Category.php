<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['slug', 'lang', 'name', 'sort_order'];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function scopeLang($query, string $lang)
    {
        return $query->where('lang', $lang);
    }

    // Add this method
    public function scopeSlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }
}
