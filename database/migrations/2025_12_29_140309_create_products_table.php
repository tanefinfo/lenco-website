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
       Schema::create('products', function (Blueprint $table) {
    $table->id();

    $table->string('name_en');
    $table->string('name_am')->nullable();
    $table->string('name_or')->nullable();

    $table->text('description_en')->nullable();
    $table->text('description_am')->nullable();
    $table->text('description_or')->nullable();

    $table->text('full_description_en')->nullable();
    $table->text('full_description_am')->nullable();
    $table->text('full_description_or')->nullable();

    $table->string('category'); // Equipment, Audio, etc
    $table->string('price')->nullable();
    $table->string('image'); // main image
    $table->json('gallery')->nullable(); // array of images

    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
