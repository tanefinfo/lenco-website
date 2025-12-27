<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AboutContent;

class AboutContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AboutContent::create([
    'lang' => 'en',
    'hero_title' => 'About Lencho Fikiru',
    'hero_subtitle' => 'A visionary creative force shaping Oromo storytelling.',
    'full_name' => 'Lencho Fikiru',
    'role' => 'Director · Filmmaker · Creative Leader',
    'bio_short' => 'Director and filmmaker focused on Oromo music videos and films.',
    'bio_long_1' => 'Lencho blends performance coaching with disciplined production.',
    'bio_long_2' => 'He collaborates with artists and brands for global stories.',
    'background_title' => 'Background & Journey',
    'background_p1' => 'Lencho’s journey blends music and cinema.',
    'background_p2' => 'He builds disciplined and respectful film sets.',
    'oromo_work_title' => 'Oromo Music Videos & Movies',
    'oromo_work_p1' => 'Songs transformed into visual storytelling.',
    'oromo_work_p2' => 'Respecting culture with international standards.',
    'vision_title' => 'Vision & Impact',
    'vision_description' => 'Creative leadership, mentorship, and impact.'
]);
AboutContent::create([
    'lang' => 'om',
    'hero_title' => 'Waa’ee Lencho Fikiru',
    'hero_subtitle' => 'Humna kalaqaa seenaa Oromo jijjiiru.',
    'full_name' => 'Lencho Fikiru',
    'role' => 'Daayirektara · Fiilm hojjataa · Geggeessaa Kalaqaa',
    'bio_short' => 'Hojjetaa fiilmii fi viidiyoo muuziqaa Oromo.',
    'bio_long_1' => 'Ogummaa agarsiisaa fi sirna hojii walitti makaa.',
    'bio_long_2' => 'Artistoota fi dhaabbilee waliin hojjetu.',
    'background_title' => 'Seenaa fi Imala',
    'background_p1' => 'Imalli isaa muuziqaa fi fiilm walitti makaa.',
    'background_p2' => 'Sirna hojii kabajaa qabu uuma.',
    'oromo_work_title' => 'Viidiyoo Muuziqaa fi Fiilm Oromo',
    'oromo_work_p1' => 'Sirboonni gara seenaa mul’ataa jijjiiramu.',
    'oromo_work_p2' => 'Aadaa fi sadarkaa addunyaa eeguu.',
    'vision_title' => 'Mul’ata fi Dhiibbaa',
    'vision_description' => 'Geggeessaa kalaqaa fi leenjii dhaloota itti aanu.'
]);
AboutContent::create([
    'lang' => 'am',
    'hero_title' => 'ስለ ሌንቾ ፊቂሩ',
    'hero_subtitle' => 'የኦሮሞ ታሪክን በፊልም እና ሙዚቃ የሚያቀርብ።',
    'full_name' => 'ሌንቾ ፊቂሩ',
    'role' => 'ዳይሬክተር · ፊልም ሰሪ · ፈጠራ መሪ',
    'bio_short' => 'በኦሮሞ ሙዚቃ ቪዲዮና ፊልም ላይ የሚሰራ።',
    'bio_long_1' => 'የአፈጻጸም ስልጠናን ከየተሟላ ሂደት ጋር ያጣምራል።',
    'bio_long_2' => 'ከአርቲስቶችና ድርጅቶች ጋር ይሰራል።',
    'background_title' => 'ታሪክና ጉዞ',
    'background_p1' => 'ጉዞው ሙዚቃና ፊልምን ያጣምራል።',
    'background_p2' => 'የተደራጀ የስራ ሂደት ይፈጥራል።',
    'oromo_work_title' => 'የኦሮሞ ሙዚቃ ቪዲዮና ፊልሞች',
    'oromo_work_p1' => 'ዘፈኖችን ወደ ታሪካዊ ምስል ይቀይራል።',
    'oromo_work_p2' => 'ባህልን በአለም አቀፍ ደረጃ ያቀርባል።',
    'vision_title' => 'ራዕይና ተፅዕኖ',
    'vision_description' => 'ፈጠራዊ መሪነትና ማስተማር።'
]);

    }
}
