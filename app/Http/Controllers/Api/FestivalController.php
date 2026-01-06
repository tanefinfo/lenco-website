<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Festival;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class FestivalController extends Controller
{
    // List all festivals
    public function index(Request $request)
    {
        $festivals = Festival::all()->map(function($f) {
            return [
                'id' => $f->id,
                'category' => $f->category,
                'title_en' => $f->title_en,
                'title_am' => $f->title_am,
                'title_or' => $f->title_or,
                'description_en' => $f->description_en,
                'description_am' => $f->description_am,
                'description_or' => $f->description_or,
                'location' => $f->location,
                'type' => $f->type,
                'date' => $f->date->format('Y-m-d'),
                'image' => $f->image ? asset($f->image) : null, // make image URL public
                'gallery' => $f->gallery ? array_map(fn($img) => asset($img), $f->gallery) : [],
                'spotlight' => $f->spotlight,
                'link' => $f->link,
            ];
        });

        return response()->json($festivals);
    }

    // Show a single festival
    public function show($id)
    {
        $festival = Festival::findOrFail($id);
        $festival->image = $festival->image ? asset($festival->image) : null;
        if ($festival->gallery) {
            $festival->gallery = array_map(fn($img) => asset($img), $festival->gallery);
        }
        return response()->json($festival);
    }

    // Create festival
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'location' => 'nullable|string',
            'type' => 'required|in:upcoming,past',
            'date' => 'required|date',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'spotlight' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle main image
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = 'storage/' . $request->file('image')->store('festivals', 'public');
        }

        // Handle gallery
        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = 'storage/' . $file->store('festivals/gallery', 'public');
            }
        }

        $festival = Festival::create([
            'title_en' => $request->title_en,
            'title_am' => $request->title_am,
            'title_or' => $request->title_or,
            'description_en' => $request->description_en,
            'description_am' => $request->description_am,
            'description_or' => $request->description_or,
            'location' => $request->location,
            'type' => $request->type,
            'date' => $request->date,
            'image' => $imagePath,
            'gallery' => $galleryPaths,
            'spotlight' => $request->spotlight,
            'link' => $request->link,
        ]);

        // Return festival with full URLs
        $festival->image = $festival->image ? asset($festival->image) : null;
        $festival->gallery = $festival->gallery ? array_map(fn($img) => asset($img), $festival->gallery) : [];

        return response()->json($festival, 201);
    }

    // Update festival (same as your version but image URLs made public)
    public function update(Request $request, $id)
    {
        $festival = Festival::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'location' => 'nullable|string',
            'type' => 'required|in:upcoming,past',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'spotlight' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle cover image
        if ($request->hasFile('image')) {
            if ($festival->image && file_exists(public_path($festival->image))) {
                @unlink(public_path($festival->image));
            }
            $path = $request->file('image')->store('festivals', 'public');
            $festival->image = 'storage/' . $path;
        }

        // Handle gallery files
        $existingGallery = $festival->gallery ?? [];
        if ($request->hasFile('gallery')) {
            $newImages = [];
            foreach ($request->file('gallery') as $file) {
                $newImages[] = 'storage/' . $file->store('festivals/gallery', 'public');
            }
            $festival->gallery = array_merge($existingGallery, $newImages);
        }

        // Update other fields
        $festival->title_en = $request->title_en;
        $festival->title_am = $request->title_am;
        $festival->title_or = $request->title_or;
        $festival->description_en = $request->description_en;
        $festival->description_am = $request->description_am;
        $festival->description_or = $request->description_or;
        $festival->location = $request->location;
        $festival->type = $request->type;
        $festival->date = $request->date;
        $festival->spotlight = $request->spotlight;
        $festival->link = $request->link;

        $festival->save();

        // Return URLs
        $festival->image = $festival->image ? asset($festival->image) : null;
        $festival->gallery = $festival->gallery ? array_map(fn($img) => asset($img), $festival->gallery) : [];

        return response()->json($festival);
    }

    // Delete festival
    public function destroy($id)
    {
        $festival = Festival::findOrFail($id);

        // Delete images
        if ($festival->image && file_exists(public_path($festival->image))) {
            @unlink(public_path($festival->image));
        }
        if ($festival->gallery) {
            foreach ($festival->gallery as $img) {
                if (file_exists(public_path($img))) {
                    @unlink(public_path($img));
                }
            }
        }

        $festival->delete();
        return response()->json(['message' => 'Festival deleted']);
    }
}
