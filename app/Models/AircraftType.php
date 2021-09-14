<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AircraftClass;
use App\Models\FuelType;

class AircraftType extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'creation_date',
        'last_moderation_date',
        'display_name',
        'type_name',
        'flights_count',
        'time_between_overhaul',
        'hightime_airframe',
        'airport_min_size',
        'empty_weight',
        'maximum_gross_weight',
        'estimated_cruise_ff',
        'baseprice',
        'fuel_total_capacity_in_gallons',
        'engine_type',
        'number_of_engines',
        'seats',
        'needs_copilot',
        'fuel_type_id',
        'maximum_cargo_weight',
        'maximum_range_in_hour',
        'maximum_range_in_nm',
        'design_speed_vs0',
        'design_speed_vs1',
        'design_speed_vc',
        'is_disabled',
        'luxef_actor',
        'standard_seat_weight',
        'is_fighter',
        'air_file_name',
        'simulator_version',
        'consolidated_design_speed_vc',
        'consolidated_estimated_cruise_ff',
        'addon_estimated_fuel_flow',
        'addon_design_speed_vc',
        'computed_max_payload',
        'computed_seats',
        'last_test_flight_date',
        'aircraft_class_id',
    ];

    public function aircraft_class()
    {
        return $this->belongsTo(AircraftClass::class, 'aircraft_class_id', 'id');
    }

    public function fuel_type()
    {
        return $this->belongsTo(FuelType::class, 'fuel_type_id', 'id');
    }
}
