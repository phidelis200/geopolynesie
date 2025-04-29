<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function getStats(): JsonResponse
    {
        $newsCount = News::count();
        $contactsCount = Contact::count();
        $pendingContactsCount = Contact::where('status', 'PENDING')->count();

        return response()->json([
            'newsCount' => $newsCount,
            'contactsCount' => $contactsCount,
            'pendingContactsCount' => $pendingContactsCount,
        ]);
    }
}
