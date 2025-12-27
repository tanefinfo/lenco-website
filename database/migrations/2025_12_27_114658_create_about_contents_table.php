<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('about_contents', function (Blueprint $table) {
            $table->id();

            // language
            $table->string('lang', 5); // en | om | am

            // hero
            $table->string('hero_title');
            $table->text('hero_subtitle');

            // profile
            $table->string('full_name');
            $table->string('role');
            $table->text('bio_short');
            $table->text('bio_long_1');
            $table->text('bio_long_2');

            // sections
            $table->string('background_title');
            $table->text('background_p1');
            $table->text('background_p2');

            $table->string('oromo_work_title');
            $table->text('oromo_work_p1');
            $table->text('oromo_work_p2');

            // vision
            $table->string('vision_title');
            $table->text('vision_description');

            $table->timestamps();

            // optional safety
            $table->unique(['lang']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_contents');
    }
};

