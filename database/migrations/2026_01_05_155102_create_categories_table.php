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
        Schema::create('categories', function (Blueprint $table) {
    $table->id();

    $table->string('slug'); // films, music-videos, commercials
    $table->string('lang', 5); // en, om, am
    $table->string('name'); // Films, Music Videos, etc.

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
        Schema::dropIfExists('categories');
    }
};
