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
        Schema::create('awards', function (Blueprint $table) {
    $table->id();

    $table->year('year');
    $table->string('category');
    $table->string('placement')->nullable();
    $table->string('issuer')->nullable();
    $table->string('project')->nullable();
    $table->string('image');

    // Multilingual fields
    $table->string('title_en');
    $table->string('title_am');
    $table->string('title_or');

    $table->text('description_en')->nullable();
    $table->text('description_am')->nullable();
    $table->text('description_or')->nullable();

    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('awards');
    }
};
