<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Award;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AwardController extends Controller
{
    /**
     * GET /api/awards
     */
    public function index(Request $request)
    {
        $lang = $request->get('lang', 'en');

        $awards = Award::latest()->get()->map(function ($a) use ($lang) {
            return [
                'id' => $a->id,
                'year' => $a->year,
                'category' => $a->category,
                'placement' => $a->placement,
                'issuer' => $a->issuer,
                'project' => $a->project,
                'title' => $a->getLocalizedTitle($lang),
                'description' => $a->getLocalizedDescription($lang),
                'image' => $a->image ? asset($a->image) : null,
            ];
        });

        return response()->json($awards);
    }

    /**
     * GET /api/awards/{id}
     */
    public function show($id)
    {
        $award = Award::findOrFail($id);
        $award->image = $award->image ? asset($award->image) : null;

        return response()->json($award);
    }

    /**
     * POST /api/awards
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'year' => 'required|string|max:10',
            'category' => 'required|string',
            'placement' => 'nullable|string',
            'issuer' => 'nullable|string',
            'project' => 'nullable|string',
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'image' => 'required|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('awards', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $award = Award::create($data);
        $award->image = asset($award->image);

        return response()->json($award, 201);
    }

    /**
     * PUT /api/awards/{id}
     */
    public function update(Request $request, $id)
    {
        $award = Award::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'year' => 'required|string|max:10',
            'category' => 'required|string',
            'placement' => 'nullable|string',
            'issuer' => 'nullable|string',
            'project' => 'nullable|string',
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($award->image) {
                Storage::disk('public')->delete(str_replace('storage/', '', $award->image));
            }
            $path = $request->file('image')->store('awards', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $award->update($data);
        $award->image = $award->image ? asset($award->image) : null;

        return response()->json($award);
    }

    /**
     * DELETE /api/awards/{id}
     */
    public function destroy($id)
    {
        $award = Award::findOrFail($id);

        if ($award->image) {
            Storage::disk('public')->delete(str_replace('storage/', '', $award->image));
        }

        $award->delete();

        return response()->json(['message' => 'Award deleted']);
    }
}
