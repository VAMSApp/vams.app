<?php

namespace App\Services\OnAir\Models;

class OnAirAircraft {

    public $uuid;
    public $aircraft_type_uuid;
    public $nickname;
    public $world_uuid;
    public $company_uuid;
    public $aircraft_status;
    public $last_status_change;
    public $current_status_duration_in_minutes;
    public $allow_sell;
    public $allow_rent;
    public $sell_price;
    public $rent_hour_price;
    public $rent_max_date;
    public $rent_airport_uuid;
    public $rent_fuel_total_gallons;
    public $rent_caution_amount;
    public $rent_company_uuid;
    public $rent_start_date;
    public $rent_last_daily_charge_date;
    public $identifier;
    public $heading;
    public $longitude;
    public $latitude;
    public $fuel_total_gallons;
    public $fuel_weight;
    public $loaded_weight;
    public $zero_fuel_weight;
    public $airframe_hours;
    public $airframe_condition;
    public $last_annual_checkup;
    public $last100h_inspection;
    public $last_weekly_ownership_payment;
    public $last_parking_fee_payment;
    public $is_controlled_by_a_i;
    public $hours_before100_h_inspection;
    public $config_first_seats;
    public $config_bus_seats;
    public $config_eco_seats;
    public $seats_reserved_for_employees;
    public $last_magic_transportation_date;
    public $current_company_uuid;
    public $current_company_id_if_any;
    public $extra_weight_capacity;
    public $total_weight_capacity;
    public $current_seats;
    public $must_do_maintenance;

    public function __construct($response)
    {

        $this->uuid = $response['Id'];
        $this->aircraft_type_uuid = $response['AircraftTypeId'];
        $this->nickname = $response['Nickname'];
        $this->world_uuid = $response['WorldId'];
        $this->company_uuid = $response['CompanyId'];
        $this->aircraft_status = $response['AircraftStatus'];
        $this->last_status_change = $response['LastStatusChange'];
        $this->current_status_duration_in_minutes = $response['CurrentStatusDurationInMinutes'];
        $this->allow_sell = $response['AllowSell'];
        $this->allow_rent = $response['AllowRent'];
        $this->sell_price = $response['SellPrice'];
        $this->rent_hour_price = $response['RentHourPrice'];
        $this->rent_max_date = $response['RentMaxDate'];
        $this->rent_airport_uuid = $response['RentAirportId'];
        $this->rent_fuel_total_gallons = $response['RentFuelTotalGallons'];
        $this->rent_caution_amount = $response['RentCautionAmount'];
        $this->rent_company_uuid = $response['RentCompanyId'];
        $this->rent_start_date = $response['RentStartDate'];
        $this->rent_last_daily_charge_date = $response['RentLastDailyChargeDate'];
        $this->identifier = $response['Identifier'];
        $this->heading = $response['Heading'];
        $this->longitude = $response['Longitude'];
        $this->latitude = $response['Latitude'];
        $this->fuel_total_gallons = $response['fuelTotalGallons'];
        $this->fuel_weight = $response['fuelWeight'];
        $this->loaded_weight = $response['loadedWeight'];
        $this->zero_fuel_weight = $response['zeroFuelWeight'];
        $this->airframe_hours = $response['airframeHours'];
        $this->airframe_condition = $response['airframeCondition'];
        $this->last_annual_checkup = $response['LastAnnualCheckup'];
        $this->last100h_inspection = $response['Last100hInspection'];
        $this->last_weekly_ownership_payment = $response['LastWeeklyOwnershipPayment'];
        $this->last_parking_fee_payment = $response['LastParkingFeePayment'];
        $this->is_controlled_by_a_i = $response['IsControlledByAI'];
        $this->hours_before100_h_inspection = $response['HoursBefore100HInspection'];
        $this->config_first_seats = $response['ConfigFirstSeats'];
        $this->config_bus_seats = $response['ConfigBusSeats'];
        $this->config_eco_seats = $response['ConfigEcoSeats'];
        $this->seats_reserved_for_employees = $response['SeatsReservedForEmployees'];
        $this->last_magic_transportation_date = $response['LastMagicTransportationDate'];
        $this->current_company_uuid = $response['CurrentCompanyId'];
        $this->current_company_id_if_any = $response['CurrentCompanyIdIfAny'];
        $this->extra_weight_capacity = $response['ExtraWeightCapacity'];
        $this->total_weight_capacity = $response['TotalWeightCapacity'];
        $this->current_seats = $response['CurrentSeats'];
        $this->must_do_maintenance = $response['MustDoMaintenance'];

    }

}
