<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->integer('employee_category_id')->required();
            $table->integer('employee_status_id')->required();
            $table->integer('world_id')->required();
            $table->integer('company_id')->required();
            $table->integer('home_airport_id')->required();
            $table->uuid('uuid');
            $table->string('pseudo');
            $table->float('flight_hours_total_before_hiring');
            $table->float('flight_hours_in_company');
            $table->float('weight')->nullable();
            $table->date('birth_date');
            $table->float('fatigue')->nullable();
            $table->float('punctuality')->nullable();
            $table->float('comfort')->nullable();
            $table->float('happiness')->nullable();
            $table->float('per_flight_hour_wages')->nullable();
            $table->float('weekly_garanted_salary')->nullable();
            $table->float('per_flight_hourly_salary')->nullable();
            $table->string('last_status_change');
            $table->string('flight_duty_start');
            $table->float('current_total_flight_hours_in_duty');
            $table->string('hired_since');
            $table->string('last_payment_date');
            $table->boolean('is_online')->default(false);
            $table->string('flight_duty_end');
            $table->float('flight_hours_grand_total');
            $table->integer('current_airport_id')->nullable();
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
        Schema::dropIfExists('employees');
    }
}
