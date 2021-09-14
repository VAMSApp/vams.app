<?php

namespace Database\Factories;

use App\Models\Aircraft;
use Illuminate\Database\Eloquent\Factories\Factory;

class AircraftFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Aircraft::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => "db8beb44-5ee4-413a-99fe-2d9a0ddbd945",
            'nickname' => "30/06/2021 03:11:13 set idle 9",
            'current_airport_uuid' => 'b8c8301a-3193-4fc3-ac54-c435aa4a38f4',
            'rent_airport_uuid' =>'b8c8301a-3193-4fc3-ac54-c435aa4a38f4',
            'aircraft_status' => 0,
            'last_status_change' => "2021-02-20T08:47:40.713",
            'current_status_duration_in_minutes' => 0,
            'allow_sell' => false,
            'allow_rent' => true,
            'sell_price' => 2691000.00,
            'rent_hour_price' => 3770.00,
            'rent_airport_uuid' => 'b8c8301a-3193-4fc3-ac54-c435aa4a38f4',
            'current_airport_uuid' => 'b8c8301a-3193-4fc3-ac54-c435aa4a38f4',
            'rent_fuel_total_gallons' => 329.72691413425514,
            'rent_caution_amount' => 37700.00,
            'rent_company_uuid' => 'a611948e-8cf8-4c75-9f43-c0388dcc65f8',
            'rent_start_date' => "2021-06-29T22:31:29.16",
            'rent_last_daily_charge_date' => "2021-06-29T22:31:29.16",
            'identifier' => "N3420R",
            'heading' => 326.3,
            'longitude' => -112.016594,
            'latitude' => 33.427084,
            'fuel_total_gallons' => 238.53989862441966,
            'fuel_weight' => 0,
            'loaded_weight' => 0.0,
            'zero_fuel_weight' => 0,
            'airframe_hours' => 5854.7810611111108,
            'airframe_condition' => 0.96836792277108463,
            'last_annual_checkup' => "2021-01-04T01:30:34.543",
            'last_100h_inspection' => "2021-01-04T01:30:34.543",
            'last_weekly_ownership_payment' => "2020-11-10T00:10:12.617",
            'last_parking_fee_payment' => "2021-06-30T05:16:24.343",
            'is_controlled_by_ai' => false,
            'hours_before_100h_inspection' => 84.218938888888886,
            'extra_weight_capacity' => 378.0,
            'total_weight_capacity' => 5523.0,
            'must_do_maintenance' => false,
            'aircraft_type_uuid' => '254ba8fe-1a6b-4770-b5a7-b5bd066a4f0c',
            'current_seats' => 47
        ];
    }
}
