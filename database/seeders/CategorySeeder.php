<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'web-development' => [
                'sort_order' => 1,
                'translations' => [
                    'en' => 'Web Development',
                    'am' => 'ድህረ ገጽ ልማት',
                    'or' => 'Misooma Marsariitii',
                ],
            ],
            'mobile-apps' => [
                'sort_order' => 2,
                'translations' => [
                    'en' => 'Mobile Applications',
                    'am' => 'የሞባይል መተግበሪያዎች',
                    'or' => 'Appilikeeshinii Mobaayilaa',
                ],
            ],
            'video-production' => [
                'sort_order' => 3,
                'translations' => [
                    'en' => 'Video Production',
                    'am' => 'ቪዲዮ ምርት',
                    'or' => 'Oomisha Viidiyoo',
                ],
            ],
        ];

        foreach ($categories as $slug => $data) {
            foreach ($data['translations'] as $lang => $name) {
                Category::updateOrCreate(
                    [
                        'slug' => $slug,
                        'lang' => $lang,
                    ],
                    [
                        'name' => $name,
                        'sort_order' => $data['sort_order'],
                    ]
                );
            }
        }
    }
}
