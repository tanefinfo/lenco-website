<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $table = 'about_contents';
   protected $fillable = [
        'lang',

        'hero_title',
        'hero_subtitle',

        'portrait_local',
        'portrait_url',

        'full_name',
        'role',
        'bio_short',
        'bio_long_1',
        'bio_long_2',

        'background_title',
        'background_p1',
        'background_p2',

        'oromo_work_title',
        'oromo_work_p1',
        'oromo_work_p2',

        'vision_title',
        'vision_description',

        'achievement_points',
        'social_links',
        'philosophies',
        'achievement_stats',
        'milestones',
    ];

    protected $casts = [
        'achievement_points' => 'array',
        'social_links' => 'array',
        'philosophies' => 'array',
        'achievement_stats' => 'array',
        'milestones' => 'array',
    ];
}
