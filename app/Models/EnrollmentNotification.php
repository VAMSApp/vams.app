<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollmentNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'ip_address',
        'sync_onair_company',
        'sync_onair_fleet',
        'sync_onair_employees',
        'sync_onair_fbos',
        'sync_onair_cashflow',
        'neofly_import_aircraft',
        'neofly_import_career',
        'neofly_import_navdata',
        'sim_type',
        'comments',
        'fleet_mgmt',
        'jobs',
        'flight_tracking',
        'confirmation_sent',
    ];

}
