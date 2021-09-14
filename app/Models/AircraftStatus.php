<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Aircraft;

class AircraftStatus extends Model
{
    use HasFactory;

    protected $fillable = [

        'id',
        'name',
        'slug',
    ];


    public function aircraft()
    {
        return $this->hasMany(Aircraft::class, 'id', 'aircraft_status_id');
    }
}
