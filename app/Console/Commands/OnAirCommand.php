<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

abstract class OnAirCommand extends Command
{
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }


    public function logStats($updated, $created)
    {
        if (!isset($updated)) {
            $updated = $this->updated;
        }

        if (!isset($created)) {
            $created = $this->created;
        }

        $this->info("$this->signature completed");
        $this->info("  Run statistics");
        $this->info("    Records Updated: $updated");
        $this->info("    Records Created: $created");
    }

}
