<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * 
     * 
     */

    // Table notifications{
    //     notification_id integer [primary key]
    //     application_id integer
    //     applicant_id integer
    //     current_status string
    //     message string
    //     date_notification date
    //   }
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notification_id');
            $table->unsignedBigInteger('application_id');
            $table->foreign('application_id')->references('application_id')->on('applications');
            $table->unsignedBigInteger('applicant_id');
            $table->foreign('applicant_id')->references('applicant_id')->on('applicants');
            $table->string('current_status');
            $table->string('message');
            $table->date('date_notification');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
