<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');

        return Event::orderBy('date', 'desc')->get()->map(function ($e) use ($lang) {
            return [
                'id' => $e->id,
                'title' => $e["title_$lang"],
                'type' => $e->type,
                'date' => $e->date,
                'time' => $e->time,
                'location' => $e->location,
                'image' => $e->image ? asset('storage/' . $e->image) : null,
            ];
        });
    }

    public function show($id)
    {
        $e = Event::findOrFail($id);

        return response()->json([
            'id' => $e->id,
            'type' => $e->type,
            'date' => $e->date,
            'time' => $e->time,
            'location' => $e->location,

            'title_en' => $e->title_en,
            'title_am' => $e->title_am,
            'title_or' => $e->title_or,

            'description_en' => $e->description_en,
            'description_am' => $e->description_am,
            'description_or' => $e->description_or,

            'image' => $e->image ? asset('storage/' . $e->image) : null,
        ]);
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
            'image' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Event::create($data);

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

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
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event->update($data);

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event,
        ]);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted']);
    }
}
