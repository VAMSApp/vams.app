<?php

namespace App\Services\OnAir\Models;

use Carbon\Carbon;

class OnAirEmployee {

    public $uuid;
    public $world_uuid;
    public $company_uuid;
    public $pseudo;
    public $flight_hours_total_before_hiring;
    public $flight_hours_in_company;
    public $weight;
    public $birth_date;
    public $fatigue;
    public $punctuality;
    public $comfort;
    public $happiness;
    public $current_aircraft_uuid;
    public $home_airport_uuid;
    public $home_airport;
    public $per_flight_hour_wages;
    public $weekly_garanted_salary;
    public $per_flight_hourly_salary;
    public $employee_category;
    public $employee_status;
    public $last_status_change;
    public $flight_duty_start;
    public $current_total_flight_hours_in_duty;
    public $hired_since;
    public $last_payment_date;
    public $is_online;
    public $flight_duty_end;
    public $flight_hours_grand_total;
    public $employee_category_id;
    public $employee_status_id;
    public $company_id;
    public $world_id;
    public $class_certifications;
    public $current_airport_uuid;
    public $current_airport;

    public function __construct($response)
    {
        $this->uuid = $response['Id'];
        $this->world_uuid = $response['WorldId'];
        $this->company_uuid = $response['CompanyId'];
        $this->pseudo = (array_key_exists('Pseudo', $response)) ? $response['Pseudo'] : '';
        $this->flight_hours_total_before_hiring = $response['FlightHoursTotalBeforeHiring'];
        $this->flight_hours_in_company = $response['FlightHoursInCompany'];
        $this->weight = $response['Weight'];
        $this->birth_date = $response['BirthDate'];
        $this->fatigue = $response['Fatigue'];
        $this->punctuality = $response['Punctuality'];
        $this->comfort = $response['Comfort'];
        $this->happiness = $response['Happiness'];
        $this->current_aircraft_uuid = (array_key_exists('CurrentAircraftId', $response)) ? $response['CurrentAircraftId'] : null;
        $this->home_airport_uuid = $response['HomeAirportId'];
        $this->per_flight_hour_wages = $response['PerFlightHourWages'];
        $this->weekly_garanted_salary = $response['WeeklyGarantedSalary'];
        $this->per_flight_hourly_salary = $response['PerFlightHourSalary'];
        $this->employee_category = $response['Category'];
        $this->employee_status = $response['Status'];
        $this->last_status_change = $response['LastStatusChange'];
        $this->flight_duty_start = (array_key_exists('FlightDutyStart', $response)) ? $response['FlightDutyStart'] : '';
        $this->current_total_flight_hours_in_duty = $response['CurrentTotalFlightHoursInDuty'];
        $this->hired_since = (array_key_exists('HiredSince', $response)) ? $response['HiredSince'] : '';
        $this->last_payment_date = (array_key_exists('LastPaymentDate', $response)) ? $response['LastPaymentDate'] : '';
        $this->is_online = $response['IsOnline'];
        $this->flight_duty_end = (array_key_exists('FlightDutyEnd', $response)) ? $response['FlightDutyEnd'] : '';
        $this->flight_hours_grand_total = $response['FlightHoursGrandTotal'];
        $this->employee_category_id = $response['Category'];
        $this->employee_status_id = $response['Status'];
        $this->home_airport = new OnAirAirport($response['HomeAirport']);

        $this->class_certifications = [];

        if (array_key_exists('ClassCertifications', $response)) {
            foreach ($response['ClassCertifications'] as $c) {
                array_push($this->class_certifications, new OnAirEmployeeClassCertification($c));
            }
        }
        if (array_key_exists('CurrentAirport', $response)) {
            $this->current_airport_uuid = $response['CurrentAirportId'];
            $this->current_airport = new OnAirAirport($response['CurrentAirport']);
        }

    }
}

