<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageHero;
use App\Models\Project;
use App\Models\Video;
use App\Models\Category;

class ContentSeeder extends Seeder
{
    public function run()
    {
        // --- HERO SECTION ---
       // --- HERO SECTION ---
$heroData = [
    'en' => ['title' => "Lencho Fikiru’s Work", 'subtitle' => "Films, Oromo music videos, and trailers—crafted with cultural respect and international standards."],
    'om' => ['title' => "Hojii Leencoo Fikiruu", 'subtitle' => "Fiilmiiwwan, viidiyoo muuziqaa Oromoo fi tiraalera."],
    'am' => ['title' => "የሌንቾ ፊቂሩ ሥራ", 'subtitle' => "ፊልሞች፣ የኦሮሞ ሙዚቃ ቪዲዮዎች እና ትሬለሮች።"]
];

foreach ($heroData as $lang => $data) {
    PageHero::updateOrCreate(
        ['page' => 'works', 'lang' => $lang], // find existing
        ['title' => $data['title'], 'subtitle' => $data['subtitle']] // insert or update
    );
}


        // --- PROJECTS ---
        $projects = [
            [
                'slug' => 'imala-gootaa',
                'category_slug' => 'films',
                'titles' => ['en' => 'Imala Goota', 'om' => 'Imala Gootaa', 'am' => 'የጀግና ጉዞ'],
                'descriptions' => ['en' => 'A powerful Oromo documentary.', 'om' => 'Dokumeentarii Oromoo cimaa.', 'am' => 'ኃይለኛ የኦሮሞ ዶክመንተሪ።'],
                'thumbnail' => '/images/imala.jpg'
            ],
            [
                'slug' => 'sirba-oromoo',
                'category_slug' => 'music-videos',
                'titles' => ['en' => 'Oromo Song Video', 'om' => 'Viidiyoo Sirba Oromoo', 'am' => 'የኦሮሞ መዝሙር ቪዲዮ'],
                'descriptions' => ['en' => 'Popular Oromo music video.', 'om' => 'Viidiyoo muuziqaa Oromoo beekkamaa.', 'am' => 'የታወቀ የኦሮሞ ሙዚቃ ቪዲዮ።'],
                'thumbnail' => '/images/sirba.jpg'
            ]
        ];

        foreach ($projects as $project) {
    foreach (['en','om','am'] as $lang) {
        $category = Category::lang($lang)->slug($project['category_slug'])->first();

        Project::updateOrCreate(
            ['slug' => $project['slug'], 'lang' => $lang], // find existing
            [
                'category_id' => $category->id,
                'title' => $project['titles'][$lang],
                'description' => $project['descriptions'][$lang],
                'thumbnail' => $project['thumbnail'],
                'sort_order' => 0
            ]
        );
    }
}


        // --- VIDEOS ---
        $videos = [
            [
                'slug' => 'siifan-jira',
                'type' => 'music-video',
                'titles' => ['en' => 'Siifan Jira', 'om' => 'Siifan Jira', 'am' => 'ስለአንተ ነኝ'],
                'descriptions' => ['en' => 'Official music video.', 'om' => 'Viidiyoo muuziqaa sirrii.', 'am' => 'የሙዚቃ ቪዲዮ ዋና።'],
                'embed_url' => 'https://www.youtube.com/embed/VIDEO_ID'
            ],
            [
                'slug' => 'trailer-imala',
                'type' => 'movie-trailer',
                'titles' => ['en' => 'Imala Trailer', 'om' => 'Tiraalera Imala', 'am' => 'ኢማላ ትሬለር'],
                'descriptions' => ['en' => 'Trailer for Imala Goota.', 'om' => 'Tiraalera Imala Gootaa.', 'am' => 'የኢማላ ጉዞ ትሬለር።'],
                'embed_url' => 'https://www.youtube.com/embed/TRAILER_ID'
            ]
        ];

        foreach ($videos as $video) {
    foreach (['en','om','am'] as $lang) {
        Video::updateOrCreate(
            ['slug' => $video['slug'], 'lang' => $lang], // find existing
            [
                'type' => $video['type'],
                'title' => $video['titles'][$lang],
                'description' => $video['descriptions'][$lang],
                'embed_url' => $video['embed_url'],
                'sort_order' => 0
            ]
        );
    }
}

    }
}
