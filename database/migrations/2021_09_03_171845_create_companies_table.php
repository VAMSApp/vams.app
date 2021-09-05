<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->integer('world_id')->required();
            $table->uuid('api_key');
            $table->string('name')->nullable();
            $table->string('onair_name')->nullable();
            $table->string('airline')->nullable();
            $table->dateTime('last_connected')->nullable(); // datetime
            $table->dateTime('last_report_date')->nullable(); // datetime
            $table->float('reputation')->nullable(); // Float
            $table->dateTime('creation_date')->nullable(); //datetime
            $table->tinyInteger('difficulty_level')->nullable();
            $table->tinyInteger('level')->nullable();
            $table->integer('xp')->nullable();
            $table->boolean('transport_employee_instant')->nullable();
            $table->boolean('transport_player_instant')->nullable();
            $table->boolean('force_time_in_simulator')->nullable();
            $table->boolean('use_small_airports')->nullable();
            $table->boolean('use_only_vanilla_airports')->nullable();
            $table->boolean('enable_skill_tree')->nullable();
            $table->tinyInteger('checkride_level')->nullable();
            $table->boolean('enable_landing_penalities')->nullable();
            $table->boolean('enable_employees_flight_duty_and_sleep')->nullable();
            $table->tinyInteger('aircraft_rent_level')->nullable();
            $table->boolean('enable_cargos_and_charters_loading_time')->nullable();
            $table->boolean('in_survival')->nullable();
            $table->double('pay_bonus_factor', 8, 2)->default(0.0);
            $table->boolean('enable_sim_failures')->nullable();
            $table->boolean('disable_seats_config_check')->nullable();
            $table->boolean('realistic_sim_procedures')->nullable();
            $table->boolean('sync_company')->default(false);
            $table->boolean('sync_employees')->default(false);
            $table->boolean('sync_fbos')->default(false);
            $table->boolean('sync_fleet')->default(false);
            $table->boolean('sync_flights')->default(false);
            $table->boolean('sync_cashflow')->default(false);
            $table->integer('owner_id')->required();
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
        Schema::dropIfExists('companies');
    }
}
