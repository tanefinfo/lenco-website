<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index(Request $request)
{
    $lang = $request->get('lang', 'en');

    $services = Service::orderBy('order')
        ->get()
        ->map(function ($s) use ($lang) {
            return [
                'id' => $s->id,
                'title' => $s["title_$lang"],
                'description' => $s["description_$lang"],
                'icon' => $s->icon ? asset($s->icon) : null,
                'features' => $s->features ?? [],
            ];
        })
        ->values();

    return response()->json($services);
}


    public function store(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string|max:255',
            'description_en' => 'required|string',
            'title_am' => 'nullable|string|max:255',
            'description_am' => 'nullable|string',
            'title_or' => 'nullable|string|max:255',
            'description_or' => 'nullable|string',
            'icon' => 'nullable|image|max:2048', // Now optional
            'features' => 'array',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Handle icon upload if provided
        if ($request->hasFile('icon')) {
            $file = $request->file('icon');
            $path = $file->store('services', 'public');
            $data['icon'] = '/storage/' . $path;
        }

        $service = Service::create($data);

        return response()->json(
    $this->formatService($service, $request->get('lang', 'en')),
    201
);

    }

    public function show(Service $service, Request $request)
    {
        $lang = $request->get('lang', 'en');

        return response()->json([
            'id' => $service->id,
            'title' => $service["title_$lang"],
            'description' => $service["description_$lang"],
            'icon' => $service->icon, // Optional, may be null
            'features' => $service->features ?? [],
        ]);
    }

    public function update(Request $request, Service $service)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'title_en' => 'sometimes|required|string|max:255',
            'description_en' => 'sometimes|required|string',
            'title_am' => 'nullable|string|max:255',
            'description_am' => 'nullable|string',
            'title_or' => 'nullable|string|max:255',
            'description_or' => 'nullable|string',
            'icon' => 'nullable|image|max:2048', // Now optional
            'features' => 'array',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Handle icon upload if provided
        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($service->icon) {
                $oldPath = str_replace('/storage/', '', $service->icon);
                Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('icon');
            $path = $file->store('services', 'public');
            $data['icon'] = '/storage/' . $path;
        }

        $service->update($data);

        return response()->json(
    $this->formatService($service, $request->get('lang', 'en'))
);

    }

    public function destroy(Service $service)
    {
        // Delete icon file if exists
        if ($service->icon) {
            $oldPath = str_replace('/storage/', '', $service->icon);
            Storage::disk('public')->delete($oldPath);
        }

        $service->delete();

        return response()->json(['message' => 'Deleted']);
    }
    private function formatService(Service $service, string $lang = 'en')
{
    return [
        'id' => $service->id,
        'title' => $service["title_$lang"],
        'description' => $service["description_$lang"],
        'icon' => $service->icon,
        'features' => $service->features ?? [],
    ];
}

}
