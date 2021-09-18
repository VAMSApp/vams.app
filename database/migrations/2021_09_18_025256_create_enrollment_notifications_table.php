<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrollmentNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrollment_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->required();
            $table->string('last_name')->required();
            $table->string('email')->unique()->required();
            $table->string('ip_address')->required();
            $table->boolean('sync_onair_company')->default(false);
            $table->boolean('sync_onair_fleet')->default(false);
            $table->boolean('sync_onair_employees')->default(false);
            $table->boolean('sync_onair_fbos')->default(false);
            $table->boolean('sync_onair_cashflow')->default(false);
            $table->string('sim_type');
            $table->string('comments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enrollment_notifications');
    }
}
