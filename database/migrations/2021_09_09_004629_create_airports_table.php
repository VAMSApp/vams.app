<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('airports', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('icao');
            $table->boolean('has_no_runways');
            $table->bigInteger('time_offset_in_sec')->nullable();
            $table->bigInteger('local_time_open_in_hours_since_midnight')->nullable();
            $table->bigInteger('local_time_close_in_hours_since_midnight')->nullable();
            $table->string('iata')->nullable();
            $table->string('name');
            $table->string('state')->nullable();
            $table->string('country_code')->nullable();
            $table->string('country_name')->nullable();
            $table->string('city')->nullable();
            $table->float('latitude');
            $table->float('longitude');
            $table->float('elevation');
            $table->boolean('has_land_runway');
            $table->boolean('has_water_runway');
            $table->boolean('has_helipad');
            $table->integer('size');
            $table->integer('transition_altitude');
            $table->boolean('is_not_in_vanilla_fsx');
            $table->boolean('is_not_in_vanilla_p3d');
            $table->boolean('is_not_in_vanilla_xplane');
            $table->boolean('is_not_in_vanilla_fs2020');
            $table->boolean('is_closed');
            $table->boolean('is_valid');
            $table->float('mag_var');
            $table->boolean('is_addon');
            $table->integer('random_seed');
            $table->dateTime('last_random_seed_generation')->nullable();
            $table->boolean('is_military');
            $table->boolean('has_lights');
            $table->integer('airport_source');
            $table->dateTime('last_very_short_request_date')->nullable();
            $table->dateTime('last_small_trip_request_date')->nullable();
            $table->dateTime('last_medium_trip_request_date')->nullable();
            $table->dateTime('last_short_haul_request_date')->nullable();
            $table->dateTime('last_medium_haul_request_date')->nullable();
            $table->dateTime('last_long_haul_request_date')->nullable();
            $table->string('display_name');
            $table->float('utc_time_open_in_hours_since_midnight');
            $table->float('utc_time_close_in_hours_since_midnight');
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
        Schema::dropIfExists('airports');
    }
}
