<?php
namespace App\Services\OnAir;

use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;

class OnAirApiService {

    public function makeRequest($world, $api_key, $endPoint)
    {
        $url = $this->buildUrl($world, $endPoint);

        $response = Http::withHeaders([
            'oa-apikey' => $api_key
        ])->get($url)->json()['Content'];

        return $response;
    }

    public function buildUrl($world, $endPoint)
    {
        $endPoint = (strpos($endPoint, '/') === 0) ? $endPoint : '/'.$endPoint;

        if ($world === 'clear-sky') {
            $world = 'stratus';
        }

        $url = 'https://'.$world.'.onair.company/api/v1'.$endPoint;

        return $url;
    }

}
