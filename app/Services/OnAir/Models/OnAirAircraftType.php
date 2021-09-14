<?php

namespace App\Services\OnAir\Models;

class OnAirAircraftType {
    public $uuid;
    public $hash;
    public $aircraft_class_uuid;
    public $creation_date;
    public $last_moderation_date;
    public $display_name;
    public $type_name;
    public $flights_count;
    public $time_between_overhaul;
    public $hightime_airframe;
    public $airport_min_size;
    public $empty_weight;
    public $maximum_gross_weight;
    public $estimated_cruise_f_f;
    public $baseprice;
    public $fuel_total_capacity_in_gallons;
    public $engine_type;
    public $number_of_engines;
    public $seats;
    public $needs_copilot;
    public $fuel_type;
    public $maximum_cargo_weight;
    public $maximum_range_in_hour;
    public $maximum_range_in_n_m;
    public $design_speed_v_s0;
    public $design_speed_v_s1;
    public $design_speed_v_c;
    public $is_disabled;
    public $luxe_factor;
    public $standard_seat_weight;
    public $is_fighter;
    public $air_file_name;
    public $simulator_version;
    public $consolidated_design_speed_v_c;
    public $consolidated_estimated_cruise_f_f;
    public $enable_auto_consolidation;
    public $addon_estimated_fuel_flow;
    public $addon_design_speed_v_c;
    public $computed_max_payload;
    public $computed_seats;
    public $is_vanilla;
    public $created_by_user_uuid;
    public $tested_by_user;

    public function __construct($response)
    {

        $this->uuid                              = $response['Id'];
        $this->hash                              = $response['Hash'];
        $this->aircraft_class_uuid               = $response['AircraftClassId'];
        $this->creation_date                     = $response['CreationDate'];
        $this->last_moderation_date              = $response['LastModerationDate'];
        $this->display_name                      = $response['DisplayName'];
        $this->type_name                         = $response['TypeName'];
        $this->flights_count                     = $response['FlightsCount'];
        $this->time_between_overhaul             = $response['TimeBetweenOverhaul'];
        $this->hightime_airframe                 = $response['HightimeAirframe'];
        $this->airport_min_size                  = $response['AirportMinSize'];
        $this->empty_weight                      = $response['emptyWeight'];
        $this->maximum_gross_weight              = $response['maximumGrossWeight'];
        $this->estimated_cruise_f_f              = $response['estimatedCruiseFF'];
        $this->baseprice                         = $response['Baseprice'];
        $this->fuel_total_capacity_in_gallons    = $response['FuelTotalCapacityInGallons'];
        $this->engine_type                       = $response['engineType'];
        $this->number_of_engines                 = $response['numberOfEngines'];
        $this->seats                             = $response['seats'];
        $this->needs_copilot                     = $response['needsCopilot'];
        $this->fuel_type                         = $response['fuelType'];
        $this->maximum_cargo_weight              = $response['maximumCargoWeight'];
        $this->maximum_range_in_hour             = $response['maximumRangeInHour'];
        $this->maximum_range_in_n_m              = $response['maximumRangeInNM'];
        $this->design_speed_v_s0                 = $response['designSpeedVS0'];
        $this->design_speed_v_s1                 = $response['designSpeedVS1'];
        $this->design_speed_v_c                  = $response['designSpeedVC'];
        $this->is_disabled                       = $response['IsDisabled'];
        $this->luxe_factor                       = $response['LuxeFactor'];
        $this->standard_seat_weight              = $response['StandardSeatWeight'];
        $this->is_fighter                        = $response['IsFighter'];
        $this->air_file_name                     = $response['AirFileName'];
        $this->simulator_version                 = $response['simulatorVersion'];
        $this->consolidated_design_speed_v_c     = $response['ConsolidatedDesignSpeedVC'];
        $this->consolidated_estimated_cruise_f_f = $response['ConsolidatedEstimatedCruiseFF'];
        $this->enable_auto_consolidation         = $response['EnableAutoConsolidation'];
        $this->addon_estimated_fuel_flow         = $response['AddonEstimatedFuelFlow'];
        $this->addon_design_speed_v_c            = $response['AddonDesignSpeedVC'];
        $this->computed_max_payload              = $response['ComputedMaxPayload'];
        $this->computed_seats                    = $response['ComputedSeats'];
        $this->is_vanilla                        = $response['IsVanilla'];
        $this->created_by_user_uuid              = $response['CreatedByUserId'];
        $this->tested_by_user                    = $response['TestedByUser'];
    }

}
