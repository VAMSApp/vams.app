<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Airport;
use App\Models\User;
use App\Models\EmployeeCategory;
use App\Models\EmployeeFlight;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'psuedo_name',
        'company_id',
        'flight_hours_total_before_hiring',
        'flight_hours_in_company',
        'weight',
        'birth_date',
        'fatigue',
        'punctuality',
        'comfort',
        'happiness',
        'per_flight_hour_wages',
        'weekly_garanted_salary',
        'per_fligh_thour_salary',
        'category',
        'status',
        'last_status_change',
        'current_total_flight_hours_in_duty',
        'freelance_since',
        'freelance_until',
        'last_payment_date',
        'is_online',
        'flight_hours_grand_total',
        'current_airport_id',
        'home_airport_id',
        'user_id',
        'world_id',
        'employee_category_id',
        'employee_status_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function certifications()
    {
        return $this->hasMany(ClassCertification::class, 'employee_id', 'id');
    }

    public function current_airport()
    {
        return $this->belongsTo(Airport::class, 'current_airport_id', 'id');
    }

    public function home_airport()
    {
        return $this->belongsTo(Airport::class, 'home_airport_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(EmployeeCategory::class, 'employee_category_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(EmployeeStatus::class, 'employee_status_id', 'id');
    }

    public function world()
    {
        return $this->belongsTo(World::class, 'world_id', 'id');
    }

    // public function flights()
    // {
    //     return $this->hasMany(EmployeeFlight::class, 'employee_id', 'id');
    // }
}
