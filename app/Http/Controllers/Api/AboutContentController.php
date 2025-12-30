<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutContentController extends Controller
{
    /**
     * GET /api/about?lang=en
     */
    public function show(Request $request)
    {
        $lang = $request->query('lang', 'en');

        $content = AboutContent::where('lang', $lang)->first();

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        return response()->json($content);
    }

    /**
     * POST /api/about
     */
    public function store(Request $request)
    {
        $data = $this->validatePayload($request, true);

        // Handle portrait_local file upload
        if ($request->hasFile('portrait_local')) {
            $file = $request->file('portrait_local');
            $path = $file->store('portraits', 'public');
            $data['portrait_local'] = '/storage/' . $path;
        }

        $content = AboutContent::create($data);

        return response()->json([
            'message' => 'Content created successfully',
            'data' => $content
        ], 201);
    }

    /**
     * PUT /api/about/{lang}
     */
    public function update(Request $request, $lang)
    {
        $content = AboutContent::where('lang', $lang)->first();

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        $data = $this->validatePayload($request, false);

        // Handle portrait_local file upload
        if ($request->hasFile('portrait_local')) {
            $file = $request->file('portrait_local');
            $path = $file->store('portraits', 'public');
            $data['portrait_local'] = '/storage/' . $path;

            // Optional: delete old image if exists
            if ($content->portrait_local) {
                $oldPath = str_replace('/storage/', '', $content->portrait_local);
                Storage::disk('public')->delete($oldPath);
            }
        }

        $content->update($data);

        return response()->json([
            'message' => 'Content updated successfully',
            'data' => $content
        ]);
    }

    /**
     * DELETE /api/about/{lang}
     */
    public function destroy($lang)
    {
        $content = AboutContent::where('lang', $lang)->first();

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        // Delete portrait file if exists
        if ($content->portrait_local) {
            $oldPath = str_replace('/storage/', '', $content->portrait_local);
            Storage::disk('public')->delete($oldPath);
        }

        $content->delete();

        return response()->json([
            'message' => 'Content deleted successfully'
        ]);
    }

    /**
     * Centralized validation
     */
    private function validatePayload(Request $request, bool $isCreate): array
    {
        $data = $request->validate([
            'lang' => $isCreate
                ? 'required|string|max:5|unique:about_contents,lang'
                : 'sometimes|string|max:5',

            // Hero
            'hero_title' => 'sometimes|string',
            'hero_subtitle' => 'sometimes|string',

            // Portrait
            'portrait_local' => $isCreate
                ? 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
                : 'sometimes|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'portrait_url' => 'nullable|string',

            // Profile
            'full_name' => 'sometimes|string',
            'role' => 'sometimes|string',
            'bio_short' => 'sometimes|string',
            'bio_long_1' => 'sometimes|string',
            'bio_long_2' => 'sometimes|string',

            // Background
            'background_title' => 'sometimes|string',
            'background_p1' => 'sometimes|string',
            'background_p2' => 'sometimes|string',

            // Oromo Work
            'oromo_work_title' => 'sometimes|string',
            'oromo_work_p1' => 'sometimes|string',
            'oromo_work_p2' => 'sometimes|string',

            // Vision
            'vision_title' => 'sometimes|string',
            'vision_description' => 'sometimes|string',

            // JSON sections
            'achievement_points' => 'sometimes|array',
            'social_links' => 'sometimes|array',
            'philosophies' => 'sometimes|array',
            'achievement_stats' => 'sometimes|array',
            'milestones' => 'sometimes|array',
        ]);

        return $data;
    }

}
