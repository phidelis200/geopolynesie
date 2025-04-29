<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Mail\ContactResponseMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::latest()->get();
        return Inertia::render('admin/contacts', [
            'initialContacts' => $contacts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return response()->json(['message' => 'Message sent successfully']);
    }

    public function sendResponse(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'answer_message' => 'required|string'
        ]);

        $contact->update([
            'answer' => true,
            'answer_message' => $validated['answer_message'],
            'answered_at' => now(),
            'status' => 'ANSWERED'
        ]);

        Mail::to($contact->email)->send(new ContactResponseMail($contact));

        return response()->json(['message' => 'Response sent successfully']);
    }
}
