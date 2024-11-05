<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OfferingEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /**
     * Create a new message instance.
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     */
    public function build()
{
    $mimeType = $this->details['employment_contract']->getMimeType();
    $email = $this->subject($this->details['subject'])
                  ->view('emails.offering')
                  ->with(['details' => $this->details]);

    // Attach the file with a Microsoft Word compatible MIME type
    if (isset($this->details['employment_contract'])) {
        $email->attach($this->details['employment_contract'], [
            'as' =>  $mimeType === 'application/pdf' ? 'employment_contract.pdf' : 'employment_contract.docx',
            'mime' => $mimeType
        ]);
    }

    return $email;
}

}
