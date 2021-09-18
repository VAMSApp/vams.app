<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\EnrollmentNotification;

class InterestNotice extends Mailable
{
    use Queueable, SerializesModels;

    public $en;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(EnrollmentNotification $en)
    {
        $this->en = $en;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.interest-received');
    }
}
