<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\User;

class OnAirRefresh extends Model
{
    use HasFactory;

    public static function boot()
    {
       parent::boot();
       static::creating(function($model)
       {
           $user = Auth::user();
           $model->created_by = $user->id;
       });

       static::updating(function($model)
       {
           $user = Auth::user();
           $model->updated_by = $user->id;
       });
   }

    protected $fillable = [
        'company_id',
        'requested_by',
        'run_method',
        'updated_by',
        'created_by',
    ];



    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function requested_by()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
