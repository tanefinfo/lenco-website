<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Project;
use App\Models\Video;
use App\Models\PageHero;
use Illuminate\Support\Facades\Validator;
 use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    /**
     * Return all content for admin (optionally filtered by lang)
     */
    /**
 * CREATE work
 */
public function storeWork(Request $request)
{
    $rules = [
        'section' => 'required|in:projects,videos',
        'lang' => 'required|in:en,am,or',
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
    ];

    if ($request->section === 'projects') {
        $rules['category_id'] = 'required|exists:categories,id';
        $rules['thumbnail'] = 'required|image|max:2048';
    }

    if ($request->section === 'videos') {
        $rules['type'] = 'required|in:music-video,movie-trailer';
        $rules['embed_url'] = 'nullable|url';
        $rules['video_file'] = 'nullable|mimes:mp4,mov,avi|max:51200';
    }

    $data = $request->validate($rules);

    /* ---------- PROJECT ---------- */
    if ($request->section === 'projects') {
        $path = $request->file('thumbnail')->store('projects', 'public');

        $item = Project::create([
            'category_id' => $data['category_id'],
            'lang' => $data['lang'],
            'title' => $data['title'],
            'slug' => str()->slug($data['title']),
            'description' => $data['description'] ?? null,
            'thumbnail' => $path,
        ]);
    }

    /* ---------- VIDEO ---------- */
    if ($request->section === 'videos') {
        $embedUrl = $data['embed_url'] ?? null;

        if ($request->hasFile('video_file')) {
            $embedUrl = $request->file('video_file')
                ->store('videos', 'public');
        }

        $item = Video::create([
            'lang' => $data['lang'],
            'title' => $data['title'],
            'slug' => str()->slug($data['title']),
            'description' => $data['description'] ?? null,
            'type' => $data['type'],
            'embed_url' => $embedUrl,
        ]);
    }

    return response()->json($item, 201);
}



public function updateWork(Request $request, $id)
{
    $data = $request->validate([
        'section' => 'required|in:projects,videos',
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'type' => 'required_if:section,videos|in:music-video,movie-trailer',
    ]);

    $model = $data['section'] === 'projects'
        ? Project::findOrFail($id)
        : Video::findOrFail($id);

    $model->update([
        'title' => $data['title'],
        'description' => $data['description'] ?? null,
        'type' => $data['type'] ?? $model->type,
    ]);

    return response()->json($model);
}


public function destroyWork(Request $request, $id)
{
    $request->validate([
        'section' => 'required|in:projects,videos'
    ]);

    $model = $request->section === 'projects'
        ? Project::findOrFail($id)
        : Video::findOrFail($id);

    $model->delete();

    return response()->json(['message' => 'Deleted']);
}




public function works(Request $request)
{
    $lang = $request->get('lang', 'en');

    $projects = Project::where('lang', $lang)
        ->latest()
        ->get()
        ->map(fn ($p) => [
            'id' => $p->id,
            'title' => $p->title,
            'description' => $p->description,
            'section' => 'projects',
            'category_id' => $p->category_id,
            'thumbnail' => $p->thumbnail
                ? Storage::url($p->thumbnail)
                : null,
            'date' => $p->created_at->toDateString(),
        ]);

    $videos = Video::where('lang', $lang)
        ->latest()
        ->get()
        ->map(fn ($v) => [
            'id' => $v->id,
            'title' => $v->title,
            'description' => $v->description,
            'section' => 'videos',
            'type' => $v->type,
            'embed_url' => $v->embed_url && str_starts_with($v->embed_url, 'http')
                ? $v->embed_url
                : null,
            'video_url' => $v->embed_url && !str_starts_with($v->embed_url, 'http')
                ? Storage::url($v->embed_url)
                : null,
            'date' => $v->created_at->toDateString(),
        ]);

    return response()->json(
        $projects->merge($videos)->values()
    );
}



};
