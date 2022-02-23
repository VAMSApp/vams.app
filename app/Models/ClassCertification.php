<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassCertification extends Model
{
    use HasFactory;
    protected $fillable = [
        'uuid',
        'employee_id',
        'aircraft_class_id',
        'last_validation',
        'comments',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function aircraft_class()
    {
        return $this->belongsTo(AircraftClass::class, 'aircraft_class_id', 'id');
    }
}
