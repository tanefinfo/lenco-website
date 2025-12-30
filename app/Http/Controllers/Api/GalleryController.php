<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');

        return Gallery::all()->map(function ($g) use ($lang) {
            return [
                'id' => $g->id,
                'category' => $g->category,
                'title' => $g["title_$lang"],
                'description' => $g["description_$lang"],
                'cover' => $g->cover,
                'images' => $g->images,
            ];
        });
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|string',
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'cover' => 'required|string',
            'images' => 'required|array',
        ]);

        return Gallery::create($data);
    }

    public function show($id, Request $request)
    {
        $lang = $request->query('lang', 'en');
        $g = Gallery::findOrFail($id);

        return [
            'id' => $g->id,
            'category' => $g->category,
            'title' => $g["title_$lang"],
            'description' => $g["description_$lang"],
            'cover' => $g->cover,
            'images' => $g->images,
        ];
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $gallery->update($request->all());

        return $gallery;
    }

    public function destroy($id)
    {
        Gallery::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
