<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class EmployeeStatus extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'id',
        'name',
        'slug',
        'oa_id',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'status_id', 'id');
    }
}
