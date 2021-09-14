<?php

namespace App\Services\OnAir\Models;

class OnAirEmployeeClassCertification {
    public $uuid;
    public $people_uuid;
    public $aircraft_class_uuid;
    public $last_validation;

    public function __construct($response)
    {
        $this->uuid = $response['Id'];
        $this->people_uuid = $response['PeopleId'];
        $this->aircraft_class_uuid = $response['AircraftClassId'];
        $this->last_validation = $response['LastValidation'];
    }

}
