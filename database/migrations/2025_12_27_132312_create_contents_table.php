<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
       Schema::create('contents', function (Blueprint $table) {
    $table->id();

    // Core identity
    $table->string('type');          // project, video, page
    $table->string('slug');          // dhaloota, hero-title
    $table->string('lang', 2);       // en, om, am

    // Display content
    $table->string('title')->nullable();
    $table->text('description')->nullable();
    $table->longText('body')->nullable();

    // Media
    $table->string('image_url')->nullable();   // image path
    $table->string('video_url')->nullable();   // youtube / vimeo

    // Extra metadata
    $table->string('category')->nullable();    // films, music, etc
    $table->string('year')->nullable();
    $table->json('extra')->nullable();

    $table->timestamps();

    $table->unique(['type', 'slug', 'lang']);
});

    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
