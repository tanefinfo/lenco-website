<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;

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
     * POST /api/about/bulk
     * {
     *   "en": {...},
     *   "om": {...}
     * }
     */
    public function bulkStore(Request $request)
    {
        foreach (['en', 'om', 'am'] as $lang) {
            if (!$request->has($lang)) {
                continue;
            }

            AboutContent::updateOrCreate(
                ['lang' => $lang],
                $request->input($lang)
            );
        }

        return response()->json([
            'message' => 'Contents saved successfully (bulk)'
        ]);
    }

    /**
     * POST /api/about
     */
    public function store(Request $request)
    {
        $data = $this->validatePayload($request, true);

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
        return $request->validate([
            'lang' => $isCreate
                ? 'required|string|max:5|unique:about_contents,lang'
                : 'sometimes|string|max:5',

            // Hero
            'hero_title' => 'sometimes|string',
            'hero_subtitle' => 'sometimes|string',

            // Portrait
            'portrait_local' => 'nullable|string',
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
    }
}
