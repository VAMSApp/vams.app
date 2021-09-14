<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class BaseByModel extends Model
{
    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:i:s A',
        'updated_at' => 'datetime:Y-m-d h:i:s A',
    ];

    protected $appends = [
        'human_updated_at',
        'human_created_at',
    ];


    public function getHumanUpdatedAtAttribute()
    {
        return $this->updated_at->diffForHumans();
    }

    public function getHumanCreatedAtAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $user = Auth::user();
            $model->created_by = ($user) ? $user->id : 1;
        });

        static::updating(function($model)
        {
            $user = Auth::user();
            $model->updated_by = ($user) ? $user->id : 1;
        });
    }
}
