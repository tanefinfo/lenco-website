<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Talent extends Model
{
    protected $table = 'talents';
    protected $fillable = [
        'title_en','title_am','title_or',
        'description_en','description_am','description_or',
        'category','deadline','cover_image'
    ];

    public function applications()
    {
        return $this->hasMany(TalentApplication::class);
    }
}
