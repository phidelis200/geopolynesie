<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Mail\ContactAutoResponseMail;
use App\Mail\ContactResponseMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::latest()
            ->select(['id', 'name', 'email', 'phone', 'subject', 'message', 'status', 'answer_message', 'answered_at', 'created_at'])
            ->paginate(5);
            
        return Inertia::render('admin/contacts', [
            'contacts' => [
                'data' => $contacts->items(),
                'links' => $contacts->links(),
                'total' => $contacts->total(),
                'currentPage' => $contacts->currentPage(),
                'lastPage' => $contacts->lastPage(),
            ]
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

        $contact = Contact::create($validated);

        try {
            Mail::to($contact->email)->send(new ContactAutoResponseMail($contact));
        } catch (\Exception $e) {
            \Log::error('Failed to send auto-response email: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Message sent successfully']);
    }

    public function sendResponse(Request $request, Contact $contact)
    {
        try {
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

            return response()->json([
                'message' => 'Response sent successfully',
                'contact' => $contact
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to send response email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send response'], 500);
        }
    }
}
