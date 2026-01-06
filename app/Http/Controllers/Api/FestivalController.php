<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Festival;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FestivalController extends Controller
{
    // List all festivals (optionally by language)
    public function index(Request $request)
    {
        $lang = $request->get('lang', 'en');

        $festivals = Festival::all()->map(function($f) use ($lang) {
            return [
                'id' => $f->id,
                'title' => $f->{'title_' . $lang},
                'description' => $f->{'description_' . $lang},
                'location' => $f->location,
                'type' => $f->type,
                'date' => $f->date->format('Y-m-d'),
                'image' => $f->image,
                'gallery' => $f->gallery,
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
            'image' => 'required|string',
            'gallery' => 'nullable|array',
            'spotlight' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $festival = Festival::create($request->all());
        return response()->json($festival, 201);
    }

    // Update festival
    public function update(Request $request, $id)
    {
        $festival = Festival::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title_en' => 'sometimes|required|string',
            'title_am' => 'sometimes|required|string',
            'title_or' => 'sometimes|required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'location' => 'nullable|string',
            'type' => 'sometimes|required|in:upcoming,past',
            'date' => 'sometimes|required|date',
            'image' => 'sometimes|required|string',
            'gallery' => 'nullable|array',
            'spotlight' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $festival->update($request->all());
        return response()->json($festival);
    }

    // Delete festival
    public function destroy($id)
    {
        $festival = Festival::findOrFail($id);
        $festival->delete();

        return response()->json(['message' => 'Festival deleted']);
    }


}
