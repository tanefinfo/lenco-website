<?php

namespace App\Http\Controllers\Api;

// use AboutContent;
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

        // Handle portrait upload
        if ($request->hasFile('portrait_local')) {
            $file = $request->file('portrait_local');
            $path = $file->store('about/portraits', 'public');
            $data['portrait_local'] = $path;
        }

        // Ensure JSON fields are properly encoded
        $this->encodeJsonFields($data);

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
        $content = AboutContent::where('lang', $lang)->firstOrFail();

        $data = $this->validatePayload($request, false);

        // Handle portrait upload
        if ($request->hasFile('portrait_local')) {
            // Delete old file if exists
            if ($content->portrait_local && Storage::disk('public')->exists($content->portrait_local)) {
                Storage::disk('public')->delete($content->portrait_local);
            }

            $file = $request->file('portrait_local');
            $path = $file->store('about/portraits', 'public');
            $data['portrait_local'] = $path;
        }

        // Encode JSON fields
        $this->encodeJsonFields($data);

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

        // Delete portrait file
        if ($content->portrait_local && Storage::disk('public')->exists($content->portrait_local)) {
            Storage::disk('public')->delete($content->portrait_local);
        }

        $content->delete();

        return response()->json(['message' => 'Content deleted successfully']);
    }

    /**
     * Validate request payload
     */

  private function validatePayload(Request $request, bool $isCreate): array
{
    $rule = $isCreate ? 'required' : 'sometimes';

    return $request->validate([
        'lang' => $isCreate
            ? 'required|string|max:5|unique:about_contents,lang'
            : 'sometimes|string|max:5',

        'hero_title' => "$rule|string",
        'hero_subtitle' => "$rule|string",

        'portrait_local' => $isCreate
            ? 'image|max:2048'
            : 'sometimes|image|max:2048',

        // 'portrait_url' => 'sometimes|url',

        'full_name' => "$rule|string",
        'role' => "$rule|string",

        'bio_short' => "$rule|string",
        'bio_long_1' => "$rule|string",
        'bio_long_2' => "$rule|string",

        'background_title' => "$rule|string",
        'background_p1' => "$rule|string",
        'background_p2' => "$rule|string",

        'oromo_work_title' => "$rule|string",
        'oromo_work_p1' => "$rule|string",
        'oromo_work_p2' => "$rule|string",

        'vision_title' => "$rule|string",
        'vision_description' => "$rule|string",

        // JSON fields come as strings from FormData
        'achievement_points' => 'sometimes',
        'social_links' => 'sometimes',
        'philosophies' => 'sometimes',
        'achievement_stats' => 'sometimes',
        'milestones' => 'sometimes',
    ]);
}


    /**
     * Encode JSON fields before saving
     */
   private function encodeJsonFields(array &$data)
{
    $jsonFields = [
        'achievement_points',
        'social_links',
        'philosophies',
        'achievement_stats',
        'milestones'
    ];

    foreach ($jsonFields as $field) {
        if (isset($data[$field]) && is_string($data[$field])) {
            $decoded = json_decode($data[$field], true);

            if (json_last_error() === JSON_ERROR_NONE) {
                $data[$field] = $decoded;
            }
        }
    }
}

}
