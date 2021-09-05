<?php
namespace App\Services\OnAir;

use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use App\Services\OnAir\OnAirApiService;

class OnAirService {
    public $ApiService;

    public function __construct (OnAirApiService $apiService)
    {
        $this->ApiService = $apiService;
    }
}
