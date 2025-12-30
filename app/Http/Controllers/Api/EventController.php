<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');

        return Event::orderBy('date', 'desc')->get()->map(function ($e) use ($lang) {
            return [
                'id' => $e->id,
                'title' => $e["title_$lang"],
                'description' => $e["description_$lang"],
                'type' => $e->type,
                'date' => $e->date,
                'time' => $e->time,
                'location' => $e->location,
                'image' => $e->image,
                'gallery' => $e->gallery,
            ];
        });
    }

    public function show($id, Request $request)
    {
        $lang = $request->query('lang', 'en');
        $e = Event::findOrFail($id);

        return [
            'id' => $e->id,
            'title' => $e["title_$lang"],
            'description' => $e["description_$lang"],
            'type' => $e->type,
            'date' => $e->date,
            'time' => $e->time,
            'location' => $e->location,
            'image' => $e->image,
            'gallery' => $e->gallery,
        ];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title_en' => 'required|string',
            'title_am' => 'required|string',
            'title_or' => 'required|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'type' => 'required|in:upcoming,past',
            'location' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'image' => 'required|string',
            'gallery' => 'nullable|array',
        ]);

        return Event::create($data);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return $event;
    }

    public function destroy($id)
    {
        Event::destroy($id);
        return response()->json(['message' => 'Event deleted']);
    }
}
