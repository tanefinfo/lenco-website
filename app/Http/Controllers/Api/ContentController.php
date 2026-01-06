<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Project;
use App\Models\Video;
use App\Models\PageHero;
use Illuminate\Support\Facades\Validator;

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
    $data = $request->validate([
        'section' => 'required|in:projects,videos',
        'lang' => 'required|in:en,am,or',
        'title' => 'required|string',
        'description' => 'nullable|string',
        'type' => 'nullable|in:music-video,movie-trailer',
        'category_id' => 'nullable|exists:categories,id',
    ]);

    if ($data['section'] === 'projects') {
        $item = Project::create([
            'lang' => $data['lang'],
            'title' => $data['title'],
            'description' => $data['description'],
            'category_id' => $data['category_id'],
        ]);
    } else {
        $item = Video::create([
            'lang' => $data['lang'],
            'title' => $data['title'],
            'description' => $data['description'],
            'type' => $data['type'],
        ]);
    }

    return response()->json($item, 201);
}
public function updateWork(Request $request, $id)
{
    $data = $request->validate([
        'section' => 'required|in:projects,videos',
        'title' => 'required|string',
        'description' => 'nullable|string',
        'type' => 'nullable|in:music-video,movie-trailer',
        'category_id' => 'nullable|exists:categories,id',
    ]);

    $model = $data['section'] === 'projects'
        ? Project::findOrFail($id)
        : Video::findOrFail($id);

    $model->update($data);

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

    $projects = Project::lang($lang)
        ->with('category')
        ->get()
        ->map(fn ($p) => [
            'id' => $p->id,
            'title' => $p->title,
            'type' => 'Project',
            'status' => 'Published',
            'date' => $p->created_at->toDateString(),
        ]);

    $videos = Video::lang($lang)
        ->get()
        ->map(fn ($v) => [
            'id' => $v->id,
            'title' => $v->title,
            'type' => $v->type === 'music-video' ? 'Music Video' : 'Movie Trailer',
            'status' => 'Published',
            'date' => $v->created_at->toDateString(),
        ]);

    return response()->json(
        $projects->merge($videos)->values()
    );
}

}
