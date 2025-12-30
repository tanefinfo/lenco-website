<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalentApplication extends Model
{
    protected $fillable = [
        'talent_id',
        'full_name',
        'email',
        'phone',
        'location',
        'photo',
        'video',
        'bio',
        'status',
        'admin_note',
        'reviewed_at'
    ];

    public function talent()
    {
        return $this->belongsTo(Talent::class);
    }
}
