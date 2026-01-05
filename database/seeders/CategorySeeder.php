<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['slug' => 'films', 'en' => 'Films', 'om' => 'Fiilmii', 'am' => 'ፊልሞች'],
            ['slug' => 'music-videos', 'en' => 'Music Videos', 'om' => 'Viidiyoo Muuziqaa', 'am' => 'የሙዚቃ ቪዲዮዎች'],
            ['slug' => 'commercials', 'en' => 'Commercials', 'om' => 'Beeksisa', 'am' => 'ማስታወቂያዎች'],
        ];

        foreach ($categories as $cat) {
            foreach (['en', 'om', 'am'] as $lang) {
                Category::create([
                    'slug' => $cat['slug'],
                    'lang' => $lang,
                    'name' => $cat[$lang],
                    'sort_order' => 0
                ]);
            }
        }
    }
}
