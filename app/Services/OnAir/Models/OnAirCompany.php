<?php

namespace App\Services\OnAir\Models;

class OnAirCompany {

    public $uuid;
    public $onair_name;
    public $airline;
    public $last_connected;
    public $last_report_date;
    public $reputation;
    public $creation_date;
    public $difficulty_level;
    public $level;
    public $xp;
    public $transport_employee_instant;
    public $transport_player_instant;
    public $force_time_in_simulator;
    public $use_small_airports;
    public $use_only_vanilla_airports;
    public $enable_skill_tree;
    public $checkride_level;
    public $enable_landing_penalities;
    public $enable_employees_flight_duty_and_sleep;
    public $aircraft_rent_level;
    public $enable_cargos_and_charters_loading_time;
    public $in_survival;
    public $pay_bonus_factor;
    public $enable_sim_failures;
    public $disable_seats_config_check;
    public $realistic_sim_procedures;

    public function __construct($response)
    {

        $this->uuid = $response['Id'];
        $this->onair_name = $response['Name'];
        $this->airline = $response['AirlineCode'];
        $this->last_connected = $response['LastConnection'];
        $this->last_report_date = $response['LastReportDate'];
        $this->reputation = $response['Reputation'];
        $this->creation_date = $response['CreationDate'];
        $this->difficulty_level = $response['DifficultyLevel'];
        $this->level = $response['Level'];
        $this->xp = $response['LevelXP'];
        $this->transport_employee_instant = $response['TransportEmployeeInstant'];
        $this->transport_player_instant = $response['TransportPlayerInstant'];
        $this->force_time_in_simulator = $response['ForceTimeInSimulator'];
        $this->use_small_airports = $response['UseSmallAirports'];
        $this->use_only_vanilla_airports = $response['UseOnlyVanillaAirports'];
        $this->enable_skill_tree = $response['EnableSkillTree'];
        $this->checkride_level = $response['CheckrideLevel'];
        $this->enable_landing_penalities = $response['EnableLandingPenalities'];
        $this->enable_employees_flight_duty_and_sleep = $response['EnableEmployeesFlightDutyAndSleep'];
        $this->aircraft_rent_level = $response['AircraftRentLevel'];
        $this->enable_cargos_and_charters_loading_time = $response['EnableCargosAndChartersLoadingTime'];
        $this->in_survival = $response['InSurvival'];
        $this->pay_bonus_factor = $response['PayBonusFactor'];
        $this->enable_sim_failures = $response['EnableSimFailures'];
        $this->disable_seats_config_check = $response['DisableSeatsConfigCheck'];
        $this->realistic_sim_procedures = $response['RealisticSimProcedures'];
    }

}
