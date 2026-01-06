<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('festivals', function (Blueprint $table) {
            $table->id();

            // Multilingual support
            $table->string('title_en');
            $table->string('title_am');
            $table->string('title_or');

            $table->text('description_en')->nullable();
            $table->text('description_am')->nullable();
            $table->text('description_or')->nullable();

            $table->string('location')->nullable();

            $table->string('type'); // upcoming | past
            $table->date('date');   // Single date column
            $table->string('image'); // Main image
            $table->json('gallery')->nullable(); // Optional gallery

            $table->string('spotlight')->nullable();
            $table->string('link')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('festivals');
    }
};
