<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\OnAir\OnAirCompanyService;

class OnAirRefreshCompanyDetails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'onair:refreshdetails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(OnAirCompanyService $companyService)
    {
        $apiKey = 'd17ea885-aad5-429b-9297-fe2e6deca5d9';
        $companyUuid = 'c3d8e51d-f2e9-4918-a286-c3f2cd5ab141';
        $response = $companyService->query_details('cumulus', $apiKey, $companyUuid);

        $updatedOrCreated = $companyService->updateOrCreate($response);

        dd($updatedOrCreated);

        return 0;
    }
}
