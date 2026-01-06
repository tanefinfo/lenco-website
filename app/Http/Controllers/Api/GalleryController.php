<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * GET /api/galleries
     */
    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');

        $galleries = Gallery::latest()->get()->map(function ($item) use ($lang) {
            return [
                'id' => $item->id,
                'category' => $item->category,
                'title' => $item->{'title_' . $lang},
                'description' => $item->{'description_' . $lang},
                'cover' => asset('storage/' . $item->cover),
                'images' => collect(json_decode($item->images ?? '[]'))
                    ->map(fn ($img) => asset('storage/' . $img)),
            ];
        });

        return response()->json($galleries);
    }

    /**
     * STORE
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',

            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',

            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',

            'cover' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Save cover
        $coverPath = $request->file('cover')->store('galleries/covers', 'public');

        // Save gallery images
        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $img) {
                $images[] = $img->store('galleries/images', 'public');
            }
        }

        $gallery = Gallery::create([
            'category' => $validated['category'],
            'title_en' => $validated['title_en'],
            'title_am' => $validated['title_am'],
            'title_or' => $validated['title_or'],
            'description_en' => $validated['description_en'] ?? null,
            'description_am' => $validated['description_am'] ?? null,
            'description_or' => $validated['description_or'] ?? null,
            'cover' => $coverPath,
            'images' => json_encode($images),
        ]);

        return response()->json([
            'message' => 'Gallery created successfully',
            'data' => $gallery,
        ], 201);
    }

    /**
     * UPDATE
     */
    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $validated = $request->validate([
            'category' => 'required|string|max:255',

            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',

            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',

            'cover' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Update cover
        if ($request->hasFile('cover')) {
            if ($gallery->cover && Storage::disk('public')->exists($gallery->cover)) {
                Storage::disk('public')->delete($gallery->cover);
            }

            $gallery->cover = $request->file('cover')->store('galleries/covers', 'public');
        }

        // Append new images
        if ($request->hasFile('images')) {
            $existing = json_decode($gallery->images ?? '[]', true);

            foreach ($request->file('images') as $img) {
                $existing[] = $img->store('galleries/images', 'public');
            }

            $gallery->images = json_encode($existing);
        }

        $gallery->update([
            'category' => $validated['category'],
            'title_en' => $validated['title_en'],
            'title_am' => $validated['title_am'],
            'title_or' => $validated['title_or'],
            'description_en' => $validated['description_en'],
            'description_am' => $validated['description_am'],
            'description_or' => $validated['description_or'],
        ]);

        return response()->json([
            'message' => 'Gallery updated successfully',
            'data' => $gallery,
        ]);
    }

    /**
     * DELETE
     */
    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);

        if ($gallery->cover && Storage::disk('public')->exists($gallery->cover)) {
            Storage::disk('public')->delete($gallery->cover);
        }

        foreach (json_decode($gallery->images ?? '[]') as $img) {
            if (Storage::disk('public')->exists($img)) {
                Storage::disk('public')->delete($img);
            }
        }

        $gallery->delete();

        return response()->json([
            'message' => 'Gallery deleted successfully',
        ]);
    }
}
