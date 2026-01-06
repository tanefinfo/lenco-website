<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Talent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TalentController extends Controller
{
    /**
     * GET /api/talents
     */
    public function index(Request $request)
    {
        $lang = $request->get('lang', 'en');

        $talents = Talent::latest()->get()->map(function ($t) use ($lang) {
            return [
                'id' => $t->id,
                'title' => $t->{'title_' . $lang},
                'description' => $t->{'description_' . $lang},
                'category' => $t->category,
                'deadline' => $t->deadline,
                'cover_image' => $t->cover_image ? asset($t->cover_image) : null,
                'applications_count' => $t->applications()->count(),
            ];
        });

        return response()->json($talents);
    }

    /**
     * GET /api/talents/{id}
     */
    public function show($id)
    {
        $talent = Talent::findOrFail($id);
        $talent->cover_image = $talent->cover_image ? asset($talent->cover_image) : null;

        return response()->json($talent);
    }

    /**
     * POST /api/talents
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'category' => 'required|string',
            'deadline' => 'required|date',
            'cover_image' => 'required|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        // Store image
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('talents', 'public');
            $data['cover_image'] = 'storage/' . $path;
        }

        $talent = Talent::create($data);
        $talent->cover_image = asset($talent->cover_image);

        return response()->json($talent, 201);
    }

    /**
     * PUT /api/talents/{id}
     */
    public function update(Request $request, $id)
    {
        $talent = Talent::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'category' => 'required|string',
            'deadline' => 'required|date',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        // Replace image if uploaded
        if ($request->hasFile('cover_image')) {
            if (
                $talent->cover_image &&
                Storage::disk('public')->exists(str_replace('storage/', '', $talent->cover_image))
            ) {
                Storage::disk('public')->delete(str_replace('storage/', '', $talent->cover_image));
            }

            $path = $request->file('cover_image')->store('talents', 'public');
            $data['cover_image'] = 'storage/' . $path;
        }

        $talent->update($data);
        $talent->cover_image = $talent->cover_image ? asset($talent->cover_image) : null;

        return response()->json($talent);
    }

    /**
     * DELETE /api/talents/{id}
     */
    public function destroy($id)
    {
        $talent = Talent::findOrFail($id);

        if ($talent->cover_image) {
            Storage::disk('public')->delete(str_replace('storage/', '', $talent->cover_image));
        }

        $talent->delete();

        return response()->json(['message' => 'Talent deleted']);
    }
}
