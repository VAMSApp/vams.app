<?php

namespace Database\Factories;

use App\Models\AircraftType;
use Illuminate\Database\Eloquent\Factories\Factory;

class AircraftTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AircraftType::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => '254ba8fe-1a6b-4770-b5a7-b5bd066a4f0c',
            'aircraft_class_uuid' => '607d854a-18f7-42ae-99f6-63b4b7f07f1a',
            'creation_date' => '2021-03-16T15:18:49.103',
            'last_moderation_date' => '2021-03-17T06:40:16.077',
            'display_name' => 'CRJ700ER',
            'type_name' => 'CRJ700ER Lufthansa Regional D-ACSB',
            'flights_count' => 1831,
            'time_between_overhaul' => 3000,
            'hightime_airframe' => 42000,
            'airport_min_size' => 1,
            'empty_weight' => 45000,
            'maximum_gross_weight' => 75000,
            'estimated_cruise_ff' => 3455,
            'baseprice' => 14731000.00,
            'fuel_total_capacity_in_gallons' => 2944.0,
            'engine_type' => 1,
            'number_of_engines' => 2,
            'seats' => 78,
            'needs_copilot' => true,
            'fuel_type' => 1,
            'maximum_cargo_weight' => 18055,
            'maximum_range_in_hour' => 5.7082452431289639,
            'maximum_range_in_nm' => 2700.0,
            'design_speed_vs0' => 111.016161454237,
            'design_speed_vs1' => 150.0218398030234,
            'design_speed_vc' => 473.0,
            'is_disabled' => false,
            'luxef_actor' => 0.0,
            'standard_seat_weight' => 63.0,
            'is_fighter' => false,
            'air_file_name' => 'CRJ700ER Lufthansa Regional D-ACSB',
            'simulator_version' => 2020,
            'consolidated_design_speed_vc' => 427.31777407048986,
            'consolidated_estimated_cruise_ff' => 3315.0,
            'addon_estimated_fuel_flow' => 3316.0,
            'addon_design_speed_vc' => 473.06886817886715,
            'computed_max_payload' => 27000,
            'computed_seats' => 90,
            'last_test_flight_date' => '2021-03-16T17:17:42.953',
        ];
    }
}
