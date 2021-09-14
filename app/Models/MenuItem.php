<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Menu;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'route_name',
        'label',
        'href',
        'is_active',
        'menu_id',
        'permission_name',
    ];

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

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id', 'id');
    }
}
