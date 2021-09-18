<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\OnAir\OnAirCompanyService;
use App\Services\OnAir\OnAirEmployeeService;

class OnAirRefreshEmployees extends OnAirCommand
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
    protected $description = 'Refreshes all employee information for company\'s that have sync_employee enabled';

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
    public function handle(OnAirEmployeeService $employeeService)
    {
        $r = $employeeService->refresh();

        $r = [
            'updated' => count($r['updated']),
            'created' => count($r['created']),
        ];

        $this->logStats($r['updated'], $r['created']);

        return 0;
    }
}
