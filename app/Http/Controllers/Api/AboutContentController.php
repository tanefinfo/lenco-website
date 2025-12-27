<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;

class AboutContentController extends Controller
{
    // ✅ READ (already exists)
    public function show(Request $request)
    {
        $lang = $request->query('lang', 'en');

        $content = AboutContent::where('lang', $lang)->first();

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        return response()->json($content);
    }

    public function bulkStore(Request $request)
{
    $languages = ['en', 'om', 'am'];

    foreach ($languages as $lang) {
        if (!$request->has($lang)) {
            continue; // skip if not sent
        }

        AboutContent::updateOrCreate(
            ['lang' => $lang],      // find by language
            $request->input($lang)  // data for that language
        );
    }

    return response()->json([
        'message' => 'Contents saved successfully (bulk)'
    ]);
}

    public function store(Request $request)
    {
        $data = $request->validate([
            'lang' => 'required|string|max:5|unique:about_contents,lang',

            'hero_title' => 'required|string',
            'hero_subtitle' => 'required|string',

            'full_name' => 'required|string',
            'role' => 'required|string',
            'bio_short' => 'required|string',
            'bio_long_1' => 'required|string',
            'bio_long_2' => 'required|string',

            'background_title' => 'required|string',
            'background_p1' => 'required|string',
            'background_p2' => 'required|string',

            'oromo_work_title' => 'required|string',
            'oromo_work_p1' => 'required|string',
            'oromo_work_p2' => 'required|string',

            'vision_title' => 'required|string',
            'vision_description' => 'required|string',
        ]);

        $content = AboutContent::create($data);

        return response()->json([
            'message' => 'Content created successfully',
            'data' => $content
        ], 201);
    }

    // ✅ UPDATE (EDIT)
    public function update(Request $request, $lang)
    {
        $content = AboutContent::where('lang', $lang)->first();

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        $content->update($request->all());

        return response()->json([
            'message' => 'Content updated successfully',
            'data' => $content
        ]);
    }

    // ✅ DELETE
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
}

