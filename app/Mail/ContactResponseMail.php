<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ContactResponseMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contact;

    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }

    public function build()
    {
        Log::info('Building response email', [
            'to' => $this->contact->email,
            'content' => $this->contact->answer_message
        ]);

        return $this->from(config('mail.from.address'))
            ->replyTo(config('mail.from.address'))
            ->subject('Réponse à votre message - Géopolynésie')
            ->view('emails.contact-response')
            ->with([
                'contact' => $this->contact
            ]);
    }

    public function failed($exception)
    {
        Log::error('Mail failed to send', [
            'error' => $exception->getMessage(),
            'to' => $this->contact->email
        ]);
    }
}
