<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('about_contents', function (Blueprint $table) {
            $table->id();

            /* ======================
               Language
            ====================== */
            $table->string('lang', 5); // en | om | am

            /* ======================
               Hero Section
            ====================== */
            $table->string('hero_title');
            $table->text('hero_subtitle');

            /* ======================
               Portrait
            ====================== */
            $table->string('portrait_local');
            $table->string('portrait_url');

            /* ======================
               Profile
            ====================== */
            $table->string('full_name');
            $table->string('role');
            $table->text('bio_short');
            $table->text('bio_long_1');
            $table->text('bio_long_2');

            /* ======================
               Background Section
            ====================== */
            $table->string('background_title');
            $table->text('background_p1');
            $table->text('background_p2');

            /* ======================
               Oromo Work Section
            ====================== */
            $table->string('oromo_work_title');
            $table->text('oromo_work_p1');
            $table->text('oromo_work_p2');

            /* ======================
               Vision Section
            ====================== */
            $table->string('vision_title');
            $table->text('vision_description');

            /* ======================
               Achievements (Bullets)
               ex:
               [
                 "Directed award-winning Oromo music videos",
                 "Mentored aspiring actors"
               ]
            ====================== */
            $table->json('achievement_points');

            /* ======================
               Social Links
               { instagram, facebook }
            ====================== */
            $table->json('social_links');

            /* ======================
               Philosophy Cards
               [
                 { title, description }
               ]
            ====================== */
            $table->json('philosophies');

            /* ======================
               Stats (By The Numbers)
               [
                 { label, value, icon }
               ]
               icon = Film | Music | Award | Users
            ====================== */
            $table->json('achievement_stats');

            /* ======================
               Milestones / Highlights
               [
                 { year, title, detail }
               ]
            ====================== */
            $table->json('milestones');

            $table->timestamps();

            $table->unique(['lang']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_contents');
    }
};
