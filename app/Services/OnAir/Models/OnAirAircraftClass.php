<?php

namespace App\Services\OnAir\Models;

class OnAirAircraftClass {
    public $uuid;
    public $short_name;
    public $name;
    public $order;
    public function __construct($response)
    {

        $this->uuid = $response['Id'];
        $this->short_name = $response['ShortName'];
        $this->name = $response['Name'];
        $this->order = $response['Order'];
    }

}
