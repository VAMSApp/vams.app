<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;

class World extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'uuid',
        'is_enabled',
    ];

    public function companies()
    {
        return $this->hasMany(Company::class, 'id', 'world_id');
    }
}
