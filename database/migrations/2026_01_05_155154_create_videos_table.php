<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
    $table->id();

    // music-video | movie-trailer
    $table->string('type');

    $table->string('slug');
    $table->string('lang', 5);

    $table->string('title');
    $table->text('description')->nullable();

    $table->string('embed_url');

    $table->integer('sort_order')->default(0);
    $table->timestamps();

    $table->unique(['slug', 'lang']);
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
