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
       Schema::create('services', function (Blueprint $table) {
    $table->id();

    $table->string('title_en');
    $table->string('title_am')->nullable();
    $table->string('title_or')->nullable();

    $table->text('description_en');
    $table->text('description_am')->nullable();
    $table->text('description_or')->nullable();

    $table->string('icon')->nullable(); // Film, Music, Video, Users

    $table->json('features')->nullable(); // array of strings

    $table->integer('order')->default(0);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
