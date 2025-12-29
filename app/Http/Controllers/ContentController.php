<?php
namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    // GET /api/contents?type=&lang=
    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'slug' => 'required|string',
            'lang' => 'required|string|size:2',
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'body' => 'nullable|string',
            'image_url' => 'nullable|string',
            'video_url' => 'nullable|string',
            'category' => 'nullable|string',
            'year' => 'nullable|string',
            'extra' => 'nullable|array',
        ]);

        return Content::create($data);
    }

    public function update(Request $request, $id)
    {
        $content = Content::findOrFail($id);

        $data = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'body' => 'nullable|string',
            'image_url' => 'nullable|string',
            'video_url' => 'nullable|string',
            'category' => 'nullable|string',
            'year' => 'nullable|string',
            'extra' => 'nullable|array',
        ]);

        $content->update($data);

        return $content;
    }

    public function index(Request $request)
    {
        return Content::where('lang', $request->get('lang', 'en'))
            ->when($request->type, fn($q) => $q->where('type', $request->type))
            ->get();
    }

    public function show($type, $slug, Request $request)
    {
        return Content::where([
            'type' => $type,
            'slug' => $slug,
            'lang' => $request->get('lang', 'en')
        ])->firstOrFail();
    }


    public function destroy($id)
    {
        $content = Content::findOrFail($id);
        $content->delete();
        return response()->json(['message' => 'Content deleted']);
    }
}
