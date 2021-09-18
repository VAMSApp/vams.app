<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Services\OnAir\OnAirCompanyService;
use App\Models\Company;
use App\Console\Commands\OnAirCommand;
class OnAirRefreshCompanyDetails extends OnAirCommand
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
    protected $description = 'Refreshes all companies that have sync_company enabled';

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
        $r = $companyService->refresh();

        $r = [
            'updated' => count($r['updated']),
            'created' => count($r['created']),
        ];

        $this->logStats($r['updated'], $r['created']);

        return 0;
    }
}
