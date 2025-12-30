<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('festivals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location')->nullable();
            $table->string('year')->nullable();
            $table->string('dates')->nullable();
            $table->string('image')->nullable();
            $table->string('type'); // upcoming | past
            $table->string('spotlight')->nullable();
            $table->text('description')->nullable();
            $table->string('link')->nullable();
            $table->string('language')->default('en'); // 🌍 language support
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('festivals');
    }
};
