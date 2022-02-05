<?php
namespace App\Services\OnAir;

use Exception;
use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;

class OnAirApiService {

    public function makeRequest($api_key, $endPoint)
    {
        $url = $this->buildUrl($endPoint);

        $response = Http::withHeaders([
            'oa-apikey' => $api_key
        ])->get($url)->json();

        if (!array_key_exists('Content', $response)) {
            throw new Exception($response['Error']);
        }

        return $response['Content'];
    }

    public function buildUrl($endPoint)
    {
        if (!$endPoint) throw new Exception('No endpoint provided to buildUrl()');

        $endPoint = (strpos($endPoint, '/') === 0) ? $endPoint : '/'.$endPoint;

        $url = 'https://server1.onair.company/api/v1'.$endPoint;

        return $url;
    }

}
