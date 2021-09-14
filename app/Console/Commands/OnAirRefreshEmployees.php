<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\OnAir\OnAirCompanyService;
use App\Services\OnAir\OnAirEmployeeService;

class OnAirRefreshEmployees extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'onair:refreshemployees';

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
    public function handle(OnAirCompanyService $companyService, OnAirEmployeeService $employeeService)
    {
        $response = $employeeService->refresh();

        return 0;
    }
}
