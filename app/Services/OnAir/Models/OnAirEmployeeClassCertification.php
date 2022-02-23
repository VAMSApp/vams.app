<?php

namespace App\Services\OnAir\Models;
use App\Services\OnAir\Models\OnAirAircraftClass;
class OnAirEmployeeClassCertification {
    public $uuid;
    public $people_uuid;
    public $aircraft_class_uuid;
    public $last_validation;
    public $aircraft_class;

    public function __construct($response)
    {
        $this->uuid = $response['Id'];
        $this->people_uuid = $response['PeopleId'];
        $this->aircraft_class_uuid = $response['AircraftClassId'];
        $this->last_validation = $response['LastValidation'];
        $this->aircraft_class = (array_key_exists('AircraftClass', $response)) ? new OnAirAircraftClass($response['AircraftClass']) : null;
    }

}
