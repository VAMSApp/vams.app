<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
use App\Models\AircraftStatus;
use App\Models\Airport;
use App\Models\AircraftType;
use App\Models\Flight;

class Aircraft extends Model
{
    use HasFactory;
    protected $fillable = [
        'uuid',
        'nickname',
        'current_airport',
        'aircraft_status_id',
        'last_status_change',
        'current_status_duration_in_minutes',
        'allow_sell',
        'allow_rent',
        'sell_price',
        'rent_hour_price',
        'rent_fuel_total_gallons',
        'rent_caution_amount',
        'rent_company_uuid',
        'rent_start_date',
        'rent_last_daily_charge_date',
        'identifier',
        'heading',
        'longitude',
        'latitude',
        'fuel_total_gallons',
        'fuel_weight',
        'loaded_weight',
        'zero_fuel_weight',
        'airframe_hours',
        'airframe_condition',
        'last_annual_checkup',
        'last_100h_inspection',
        'last_weekly_ownership_payment',
        'last_parking_fee_payment',
        'is_controlled_by_ai',
        'hours_before_100h_inspection',
        'extra_weight_capacity',
        'total_weight_capacity',
        'must_do_maintenance',
        'aircraft_type_id',
        'current_seats',
        'current_airport_id',
        'rent_airport_id',
        'config_seats_first',
        'config_seats_bus',
        'config_seats_eco',
        'company_id',
        'is_owned',
        'is_rented',
    ];

    public function status()
    {
        return $this->belongsTo(AircraftStatus::class, 'aircraft_status_id', 'id');
    }

    public function aircraft_type()
    {
        return $this->belongsTo(AircraftType::class, 'aircraft_type_id', 'id');
    }

    public function current_airport()
    {
        return $this->belongsTo(Airport::class, 'current_airport_id', 'id');
    }

    public function rent_airport()
    {
        return $this->belongsTo(Airport::class, 'rent_airport_id', 'id');
    }

    // public function flights()
    // {
    //     return $this->hasMany(Flight::class, 'aircraft_id', 'id');
    // }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }
}
