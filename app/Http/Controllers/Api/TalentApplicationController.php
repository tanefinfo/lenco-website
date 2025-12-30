<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TalentApplication;
class TalentApplicationController extends Controller
{
    public function store(Request $request, $id)
{
    $validated = $request->validate([
        'full_name' => 'required|string|max:255',
        'email' => 'required|email',
        'phone' => 'nullable|string',
        'location' => 'nullable|string',
        'bio' => 'nullable|string',
        'photo' => 'nullable|string',
        'video' => 'nullable|string',
    ]);

    $application = TalentApplication::create([
        'talent_id' => $id,
        ...$validated,
    ]);

    return response()->json([
        'message' => 'Application submitted successfully',
        'data' => $application
    ], 201);
}
   public function index()
    {
        return TalentApplication::latest()->get();
    }

    // View single application
    public function show($id)
    {
        return TalentApplication::findOrFail($id);
    }

    // Review (Approve / Reject)
    public function review(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'admin_note' => 'nullable|string'
        ]);

        $application = TalentApplication::findOrFail($id);
        $application->update([
            'status' => $request->status,
            'admin_note' => $request->admin_note,
            'reviewed_at' => now()
        ]);

        return response()->json([
            'message' => 'Application reviewed successfully',
            'data' => $application
        ]);
    }
}
