<?php

namespace App\Http\Controllers;

use App\Models\Award;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    //  Get all awards (with language support)
   public function index(Request $request)
{
    $lang = $request->query('lang', 'en');

    return Award::all()->map(function ($award) use ($lang) {
        return [
            'id' => $award->id,
            'year' => $award->year,
            'category' => $award->category,
            'placement' => $award->placement,
            'issuer' => $award->issuer,
            'project' => $award->project,
            'image' => $award->image,
            'title' => $award->{"title_$lang"},
            'description' => $award->{"description_$lang"},
        ];
    });
}


    //  Store new award
    public function store(Request $request)
{
    $validated = $request->validate([
        'year' => 'required|integer',
        'category' => 'required|string',
        'placement' => 'nullable|string',
        'issuer' => 'nullable|string',
        'project' => 'nullable|string',
        'image' => 'required|string',

        'title_en' => 'required|string',
        'title_am' => 'required|string',
        'title_or' => 'required|string',

        'description_en' => 'nullable|string',
        'description_am' => 'nullable|string',
        'description_or' => 'nullable|string',
    ]);

    $award = Award::create($validated);

    return response()->json($award, 201);
}

    //  Show single award
    public function show($id)
    {
        $award = Award::findOrFail($id);
        return response()->json($award);
    }

    //  Update award
    public function update(Request $request, $id)
    {
        $award = Award::findOrFail($id);

        $award->update($request->only([
            'year',
            'category',
            'placement',
            'issuer',
            'project',
            'image',
            'title_en',
            'title_am',
            'title_or',
            'description_en',
            'description_am',
            'description_or',
        ]));

        return response()->json($award);
    }

    // Delete award
    public function destroy($id)
    {
        $award = Award::findOrFail($id);
        $award->delete();

        return response()->json([
            'message' => 'Award deleted successfully'
        ]);
    }
}
