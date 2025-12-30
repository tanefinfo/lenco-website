<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Festival;
use Illuminate\Http\Request;

class FestivalController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->get('lang', 'en');

        return Festival::where('language', $lang)
            ->orderBy('year', 'desc')
            ->get();
    }

    public function show($id)
    {
        return Festival::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'location' => 'nullable|string',
            'year' => 'nullable|string',
            'dates' => 'nullable|string',
            'image' => 'nullable|string',
            'type' => 'required|in:upcoming,past',
            'spotlight' => 'nullable|string',
            'description' => 'nullable|string',
            'link' => 'nullable|string',
            'language' => 'required|string',
        ]);

        return Festival::create($data);
    }

    public function update(Request $request, $id)
    {
        $festival = Festival::findOrFail($id);

        $festival->update($request->all());

        return $festival;
    }

    public function destroy($id)
    {
        Festival::findOrFail($id)->delete();
        return response()->json(['message' => 'Festival deleted']);
    }
}
