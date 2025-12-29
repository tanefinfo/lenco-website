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
        Schema::create('talent_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('talent_id')->constrained('talents')->cascadeOnDelete();

            $table->string('full_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('location')->nullable();

            $table->string('photo')->nullable();
            $table->string('video')->nullable(); // URL or uploaded video
            $table->text('bio')->nullable();
             $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_note')->nullable();
             $table->timestamp('reviewed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('talent_applications');
    }
};
