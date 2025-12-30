<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;

    protected $table = 'awards';

    protected $fillable = [
    'year',
    'category',
    'placement',
    'issuer',
    'project',
    'image',
    'title_en',
    'title_am',
    'title_or',
    'description_en',
    'description_am',
    'description_or',
];


    /**
     * Return localized fields dynamically
     */
    public function getLocalizedTitle($lang = 'en')
    {
        return $this->{"title_{$lang}"} ?? $this->title_en;
    }

    public function getLocalizedDescription($lang = 'en')
    {
        return $this->{"description_{$lang}"} ?? $this->description_en;
    }
}
