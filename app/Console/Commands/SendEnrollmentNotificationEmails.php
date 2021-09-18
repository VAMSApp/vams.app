<?php

namespace App\Console\Commands;

use App\Mail\InterestNotice;
use App\Models\EnrollmentNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendEnrollmentNotificationEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendenrollmentemails';

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
    public function handle()
    {
        $ens = EnrollmentNotification::where('confirmation_sent', false)->get();

        foreach ($ens as $key => $en) {
            Mail::to($en->email)
                ->bcc('admin@vams.app')
                ->send(new InterestNotice($en));
            $en->confirmation_sent = true;
            $en->save();
        }

        return 0;
    }
}
