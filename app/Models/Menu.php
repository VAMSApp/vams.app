<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MenuItem;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'is_active',
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

    public function menu_items()
    {
        return $this->hasMany(MenuItem::class, 'menu_id');
    }
}
