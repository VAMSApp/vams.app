<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'icao',
        'has_no_runways',
        'time_offset_in_sec',
        'local_time_open_in_hours_since_midnight',
        'local_time_close_in_hours_since_midnight',
        'iata',
        'name',
        'state',
        'country_code',
        'country_name',
        'city',
        'latitude',
        'longitude',
        'elevation',
        'has_land_runway',
        'has_water_runway',
        'has_helipad',
        'size',
        'transition_altitude',
        'is_not_in_vanilla_fsx',
        'is_not_in_vanilla_p3d',
        'is_not_in_vanilla_xplane',
        'is_not_in_vanilla_fs2020',
        'is_closed',
        'is_valid',
        'mag_var',
        'is_addon',
        'random_seed',
        'last_random_seed_generation',
        'is_military',
        'has_lights',
        'airport_source',
        'last_very_short_request_date',
        'last_small_trip_request_date',
        'last_medium_trip_request_date',
        'last_short_haul_request_date',
        'last_medium_haul_request_date',
        'last_long_haul_request_date',
        'display_name',
        'utc_time_open_in_hours_since_midnight',
        'utc_time_close_in_hours_since_midnight',
    ];
}
