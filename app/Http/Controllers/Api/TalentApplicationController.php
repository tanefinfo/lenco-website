<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Talent;
use App\Models\TalentApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class TalentApplicationController extends Controller
{
    /**
     * GET /api/talent-applications
     * Admin: list all applications
     */
    public function index(Request $request)
    {
        $query = TalentApplication::with('talent')->latest();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->talent_id) {
            $query->where('talent_id', $request->talent_id);
        }

        return response()->json($query->get());
    }

    /**
     * GET /api/talent-applications/{id}
     */
    public function show($id)
    {
        return TalentApplication::with('talent')->findOrFail($id);
    }

    /**
     * POST /api/talents/{talent}/apply
     * Public submission
     */
    public function store(Request $request, $talentId)
    {
        $talent = Talent::findOrFail($talentId);

        // Optional: block late submissions
        if ($talent->deadline && now()->gt($talent->deadline)) {
            return response()->json([
                'message' => 'Application deadline has passed.'
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov,avi,webm|max:51200', // 50MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['talent_id'] = $talentId;
        $data['status'] = 'pending';

        // Upload photo
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('talent-applications/photos', 'public');
            $data['photo'] = 'storage/' . $path;
        }

        // Upload video
        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('talent-applications/videos', 'public');
            $data['video'] = 'storage/' . $path;
        }

        $application = TalentApplication::create($data);

        return response()->json($application, 201);
    }

    /**
     * PUT /api/talent-applications/{id}
     * Admin review/update
     */
    public function update(Request $request, $id)
    {
        $application = TalentApplication::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,approved,rejected',
            'admin_note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $application->status = $request->status;
        $application->admin_note = $request->admin_note;
        $application->reviewed_at = Carbon::now();

        $application->save();

        return response()->json($application);
    }

    /**
     * DELETE /api/talent-applications/{id}
     * Admin delete
     */
    public function destroy($id)
    {
        $application = TalentApplication::findOrFail($id);

        if ($application->photo) {
            Storage::disk('public')->delete(str_replace('storage/', '', $application->photo));
        }

        if ($application->video) {
            Storage::disk('public')->delete(str_replace('storage/', '', $application->video));
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted']);
    }
}
