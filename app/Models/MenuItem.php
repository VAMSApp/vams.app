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

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id', 'id');
    }
}
