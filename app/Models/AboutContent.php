<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $fillable = [
        'lang',

        // Hero
        'hero_title',
        'hero_subtitle',

        // Portrait
        'portrait_local',
        'portrait_url',

        // Profile
        'full_name',
        'role',
        'bio_short',
        'bio_long_1',
        'bio_long_2',

        // Background
        'background_title',
        'background_p1',
        'background_p2',

        // Oromo Work
        'oromo_work_title',
        'oromo_work_p1',
        'oromo_work_p2',

        // Vision
        'vision_title',
        'vision_description',

        // Dynamic Sections (JSON)
        'achievement_points',
        'social_links',
        'philosophies',
        'achievement_stats',
        'milestones',
    ];

    /**
     * Cast JSON columns automatically
     */
    protected $casts = [
        'achievement_points' => 'array',
        'social_links'       => 'array',
        'philosophies'       => 'array',
        'achievement_stats'  => 'array',
        'milestones'         => 'array',
    ];
}
