<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollmentNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'ip_address',
        'sync_onair_company',
        'sync_onair_fleet',
        'sync_onair_employees',
        'sync_onair_fbos',
        'sync_onair_cashflow',
        'sim_type',
        'comments',
    ];

}
