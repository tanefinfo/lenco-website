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
    public function index(Request $request)
    {
        $lang = $request->get('lang', 'en');

        $categories = Category::lang($lang)->orderBy('sort_order')->get();
        $projects = Project::lang($lang)->with('category')->orderBy('sort_order')->get();
        $musicVideos = Video::lang($lang)->type('music-video')->orderBy('sort_order')->get();
        $movieTrailers = Video::lang($lang)->type('movie-trailer')->orderBy('sort_order')->get();
        $hero = PageHero::page('works')->lang($lang)->first();

        return response()->json([
            'hero' => $hero,
            'categories' => $categories,
            'projects' => $projects,
            'videos' => [
                'musicVideos' => $musicVideos,
                'movieTrailers' => $movieTrailers
            ]
        ]);
    }

    /**
     * Store new content (for admin)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'section' => 'required|string|in:hero,categories,projects,videos',
            'lang' => 'required|string|in:en,om,am',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'meta' => 'nullable|array',
            'category_id' => 'nullable|exists:categories,id',
            'type' => 'nullable|string|in:music-video,movie-trailer',
            'slug' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        $section = $request->section;

        switch ($section) {
            case 'hero':
                $item = PageHero::create([
                    'page' => 'works',
                    'lang' => $request->lang,
                    'title' => $request->title,
                    'subtitle' => $request->subtitle
                ]);
                break;

            case 'categories':
                $item = Category::create([
                    'slug' => $request->slug,
                    'lang' => $request->lang,
                    'name' => $request->title,
                    'sort_order' => $request->sort_order ?? 0
                ]);
                break;

            case 'projects':
                $item = Project::create([
                    'category_id' => $request->category_id,
                    'slug' => $request->slug,
                    'lang' => $request->lang,
                    'title' => $request->title,
                    'description' => $request->description,
                    'thumbnail' => $request->thumbnail,
                    'sort_order' => $request->sort_order ?? 0
                ]);
                break;

            case 'videos':
                $item = Video::create([
                    'type' => $request->type,
                    'slug' => $request->slug,
                    'lang' => $request->lang,
                    'title' => $request->title,
                    'description' => $request->description,
                    'embed_url' => $request->embed_url,
                    'sort_order' => $request->sort_order ?? 0
                ]);
                break;
        }

        return response()->json(['message' => 'Created successfully', 'data' => $item]);
    }

    /**
     * Show single content item by id
     */
    public function show($id)
    {
        $models = [Category::class, Project::class, Video::class, PageHero::class];

        foreach ($models as $model) {
            $item = $model::find($id);
            if ($item) return response()->json($item);
        }

        return response()->json(['message' => 'Item not found'], 404);
    }

    /**
     * Update content
     */
    public function update(Request $request, $id)
    {
        $models = [Category::class, Project::class, Video::class, PageHero::class];

        foreach ($models as $model) {
            $item = $model::find($id);
            if ($item) {
                $item->update($request->only([
                    'title','subtitle','description','meta','slug','sort_order','lang','category_id','thumbnail','embed_url','type'
                ]));
                return response()->json(['message'=>'Updated successfully','data'=>$item]);
            }
        }

        return response()->json(['message'=>'Item not found'],404);
    }

    /**
     * Delete content
     */
    public function destroy($id)
    {
        $models = [Category::class, Project::class, Video::class, PageHero::class];

        foreach ($models as $model) {
            $item = $model::find($id);
            if ($item) {
                $item->delete();
                return response()->json(['message'=>'Deleted successfully']);
            }
        }

        return response()->json(['message'=>'Item not found'],404);
    }
}
