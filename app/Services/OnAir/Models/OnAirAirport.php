<?php

namespace App\Services\OnAir\Models;

class OnAirAirport {

    public $uuid;
    public $icao;
    public $has_no_runways;
    public $time_offset_in_sec;
    public $local_time_open_in_hours_since_midnight;
    public $local_time_close_in_hours_since_midnight;
    public $iata;
    public $name;
    public $state;
    public $country_code;
    public $country_name;
    public $city;
    public $latitude;
    public $longitude;
    public $elevation;
    public $has_land_runway;
    public $has_water_runway;
    public $has_helipad;
    public $size;
    public $transition_altitude;
    public $is_not_in_vanilla_f_s_x;
    public $is_not_in_vanilla_p3_d;
    public $is_not_in_vanilla_x_p_l_a_n_e;
    public $is_not_in_vanilla_f_s2020;
    public $is_closed;
    public $is_valid;
    public $mag_var;
    public $is_addon;
    public $random_seed;
    public $last_random_seed_generation;
    public $is_military;
    public $has_lights;
    public $airport_source;
    public $last_very_short_request_date;
    public $last_small_trip_request_date;
    public $last_medium_trip_request_date;
    public $last_short_haul_request_date;
    public $last_medium_haul_request_date;
    public $last_long_haul_request_date;
    public $display_name;
    public $utc_time_open_in_hours_since_midnight;
    public $utc_time_close_in_hours_since_midnight;
    public $is_not_in_vanilla_fsx;
    public $is_not_in_vanilla_p3d;
    public $is_not_in_vanilla_xplane;
    public $is_not_in_vanilla_fs2020;

    public function __construct($response)
    {

        $this->uuid = $response['Id'];
        $this->icao = $response['ICAO'];
        $this->has_no_runways = $response['HasNoRunways'];
        $this->time_offset_in_sec = $response['TimeOffsetInSec'];
        $this->local_time_open_in_hours_since_midnight = $response['LocalTimeOpenInHoursSinceMidnight'];
        $this->local_time_close_in_hours_since_midnight = $response['LocalTimeCloseInHoursSinceMidnight'];
        $this->iata = $response['IATA'];
        $this->name = $response['Name'];
        $this->state = $response['State'];
        $this->country_code = $response['CountryCode'];
        $this->country_name = $response['CountryName'];
        $this->city = $response['City'];
        $this->latitude = $response['Latitude'];
        $this->longitude = $response['Longitude'];
        $this->elevation = $response['Elevation'];
        $this->has_land_runway = $response['HasLandRunway'];
        $this->has_water_runway = $response['HasWaterRunway'];
        $this->has_helipad = $response['HasHelipad'];
        $this->size = $response['Size'];
        $this->transition_altitude = $response['TransitionAltitude'];
        $this->is_not_in_vanilla_f_s_x = $response['IsNotInVanillaFSX'];
        $this->is_not_in_vanilla_p3_d = $response['IsNotInVanillaP3D'];
        $this->is_not_in_vanilla_x_p_l_a_n_e = $response['IsNotInVanillaXPLANE'];
        $this->is_not_in_vanilla_f_s2020 = $response['IsNotInVanillaFS2020'];
        $this->is_closed = $response['IsClosed'];
        $this->is_valid = $response['IsValid'];
        $this->mag_var = $response['MagVar'];
        $this->is_addon = $response['IsAddon'];
        $this->random_seed = $response['RandomSeed'];
        $this->last_random_seed_generation = $response['LastRandomSeedGeneration'];
        $this->is_military = $response['IsMilitary'];
        $this->has_lights = $response['HasLights'];
        $this->airport_source = $response['AirportSource'];
        $this->last_very_short_request_date = $response['LastVeryShortRequestDate'];
        $this->last_small_trip_request_date = $response['LastSmallTripRequestDate'];
        $this->last_medium_trip_request_date = $response['LastMediumTripRequestDate'];
        $this->last_short_haul_request_date = $response['LastShortHaulRequestDate'];
        $this->last_medium_haul_request_date = (array_key_exists('LastMediumHaulRequestDate', $response)) ? $response['LastMediumHaulRequestDate'] : false;
        $this->last_long_haul_request_date = (array_key_exists('LastLongHaulRequestDate', $response)) ? $response['LastLongHaulRequestDate'] : false;
        $this->display_name = $response['DisplayName'];
        $this->utc_time_open_in_hours_since_midnight = $response['UTCTimeOpenInHoursSinceMidnight'];
        $this->utc_time_close_in_hours_since_midnight = $response['UTCTimeCloseInHoursSinceMidnight'];
        $this->is_not_in_vanilla_fsx = (array_key_exists('is_not_in_vanilla_fsx', $response)) ? $response['is_not_in_vanilla_fsx'] : false;
        $this->is_not_in_vanilla_p3d = (array_key_exists('is_not_in_vanilla_p3d', $response)) ? $response['is_not_in_vanilla_p3d'] : false;
        $this->is_not_in_vanilla_xplane = (array_key_exists('is_not_in_vanilla_xplane', $response)
        ) ? $response['is_not_in_vanilla_xplane'] : false;
        $this->is_not_in_vanilla_fs2020 = (array_key_exists('is_not_in_vanilla_fs2020', $response)) ? $response['is_not_in_vanilla_fs2020'] : false;

    }

}
