<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
public function index(Request $request)
{
    $langMap = [
        'en' => 'en',
        'am' => 'am',
        'ao' => 'or',
    ];

    $lang = $langMap[$request->query('lang', 'en')] ?? 'en';

    return Gallery::all()->map(function ($g) use ($lang) {
        return [
            'id' => $g->id,
            'category' => $g->category,
            'title' => $g->{"title_$lang"},
            'description' => $g->{"description_$lang"},
            'cover' => $g->cover,
            'images' => $g->images ?? [],
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
            'cover' => 'required|image',
            'images.*' => 'image',
        ]);

        // Cover upload
        $data['cover'] = $request->file('cover')->store('galleries/covers', 'public');

        // Images upload
        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $img) {
                $images[] = $img->store('galleries/images', 'public');
            }
        }

        $data['images'] = $images;

        return Gallery::create($data);
    }

public function show($id, Request $request)
{
    $langMap = [
        'en' => 'en',
        'am' => 'am',
        'ao' => 'or',
    ];

    $lang = $langMap[$request->query('lang', 'en')] ?? 'en';

    $g = Gallery::findOrFail($id);

    return [
        'id' => $g->id,
        'category' => $g->category,
        'title' => $g->{"title_$lang"},
        'description' => $g->{"description_$lang"},
        'cover' => $g->cover,
        'images' => $g->images ?? [],
    ];
}


    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $data = $request->validate([
            'category' => 'required|string',
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'cover' => 'nullable|image',
            'images.*' => 'image',
        ]);

        if ($request->hasFile('cover')) {
            Storage::disk('public')->delete($gallery->cover);
            $data['cover'] = $request->file('cover')->store('galleries/covers', 'public');
        }

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $img) {
                $images[] = $img->store('galleries/images', 'public');
            }
            $data['images'] = $images;
        }

        $gallery->update($data);

        return $gallery;
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);

        Storage::disk('public')->delete($gallery->cover);
        foreach ($gallery->images ?? [] as $img) {
            Storage::disk('public')->delete($img);
        }

        $gallery->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
