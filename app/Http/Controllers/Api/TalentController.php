<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Talent;

class TalentController extends Controller
{
     public function index() {
        return Talent::latest()->get();
    }

    public function show($id) {
        return Talent::with('applications')->findOrFail($id);
    }

    public function store(Request $request) {
        return Talent::create($request->all());
    }

    public function update(Request $request, $id) {
        $talent = Talent::findOrFail($id);
        $talent->update($request->all());
        return $talent;
    }

    public function destroy($id) {
        Talent::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
