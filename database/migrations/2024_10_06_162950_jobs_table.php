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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id('job_id');
            $table->string('job_name');
            $table->unsignedBigInteger('job_type_id');
            $table->foreign('job_type_id')->references('job_type_id')->on('job_types');
            $table->bigInteger('min_rate_salary');
            $table->bigInteger('max_rate_salary');
            $table->integer('min_experience');
            $table->string('job_desc');
            $table->string('job_place');
            $table->json('requirement');
            $table->json('responsibilities');
            $table->date('date_listed');
            $table->date('date_expired');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
