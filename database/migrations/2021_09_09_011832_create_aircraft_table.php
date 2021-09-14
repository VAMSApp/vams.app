<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAircraftTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aircraft', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('nickname')->nullable();
            $table->integer('aircraft_status_id');
            $table->dateTime('last_status_change');
            $table->float('current_status_duration_in_minutes');
            $table->boolean('allow_sell');
            $table->boolean('allow_rent');
            $table->integer('sell_price');
            $table->float('rent_hour_price');
            $table->float('rent_fuel_total_gallons')->nullable();
            $table->float('rent_caution_amount', 20, 2)->nullable();
            $table->dateTime('rent_start_date')->nullable();
            $table->dateTime('rent_last_daily_charge_date')->nullable();
            $table->string('identifier');
            $table->float('heading');
            $table->float('longitude');
            $table->float('latitude');
            $table->float('fuel_total_gallons');
            $table->float('fuel_weight');
            $table->float('loaded_weight');
            $table->float('zero_fuel_weight');
            $table->float('airframe_hours');
            $table->float('airframe_condition');
            $table->dateTime('last_annual_checkup');
            $table->dateTime('last_100h_inspection');
            $table->dateTime('last_weekly_ownership_payment');
            $table->dateTime('last_parking_fee_payment');
            $table->boolean('is_controlled_by_ai');
            $table->float('hours_before_100h_inspection');
            $table->float('extra_weight_capacity');
            $table->float('total_weight_capacity');
            $table->boolean('must_do_maintenance');
            $table->integer('aircraft_type_id')->required();
            $table->integer('current_seats');
            $table->integer('current_airport_id')->nullable();
            $table->integer('rent_airport_id')->nullable();
            $table->string('img')->nullable();
            $table->integer('config_seats_first')->default(0);
            $table->integer('config_seats_bus')->default(0);
            $table->integer('config_seats_eco')->default(0);
            $table->integer('company_id')->nullable();
            $table->boolean('is_rented')->default(false);
            $table->boolean('is_owned')->default(false);
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
        Schema::dropIfExists('aircraft');
    }
}
