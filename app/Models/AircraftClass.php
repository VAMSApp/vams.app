<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AircraftClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'short_name',
        'name',
        'order',
    ];

    public function required_certification()
    {
        return $this->hasOne(ClassCertification::class, 'aircraft_class_id', 'id');
    }
}
