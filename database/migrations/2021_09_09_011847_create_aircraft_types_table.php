<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAircraftTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aircraft_types', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->required();
            $table->dateTime('creation_date');
            $table->dateTime('last_moderation_date');
            $table->string('display_name');
            $table->string('type_name');
            $table->integer('flights_count');
            $table->string('time_between_overhaul');
            $table->integer('hightime_airframe');
            $table->integer('airport_min_size');
            $table->integer('empty_weight');
            $table->integer('maximum_gross_weight');
            $table->integer('estimated_cruise_ff');
            $table->integer('baseprice');
            $table->float('fuel_total_capacity_in_gallons');
            $table->integer('engine_type');
            $table->integer('number_of_engines');
            $table->integer('seats');
            $table->boolean('needs_copilot');
            $table->integer('fuel_type_id');
            $table->integer('maximum_cargo_weight');
            $table->float('maximum_range_in_hour');
            $table->float('maximum_range_in_nm');
            $table->float('design_speed_vs0');
            $table->float('design_speed_vs1');
            $table->float('design_speed_vc');
            $table->boolean('is_disabled');
            $table->float('luxef_actor');
            $table->float('standard_seat_weight');
            $table->boolean('is_fighter');
            $table->string('air_file_name')->nullable();
            $table->integer('simulator_version');
            $table->float('consolidated_design_speed_vc');
            $table->float('consolidated_estimated_cruise_ff');
            $table->float('addon_estimated_fuel_flow');
            $table->float('addon_design_speed_vc');
            $table->integer('computed_max_payload');
            $table->integer('computed_seats');
            $table->dateTime('last_test_flight_date')->nullable();
            $table->integer('aircraft_class_id')->required();
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
        Schema::dropIfExists('aircraft_types');
    }
}
