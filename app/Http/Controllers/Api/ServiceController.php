<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->get('lang', 'en');

        return Service::orderBy('order')->get()->map(fn ($s) => [
            'id' => $s->id,
            'title' => $s["title_$lang"],
            'description' => $s["description_$lang"],
            'icon' => $s->icon,
            'features' => $s->features,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title_en' => 'required',
            'description_en' => 'required',
            'title_am' => 'nullable',
            'description_am' => 'nullable',
            'title_or' => 'nullable',
            'description_or' => 'nullable',
            'icon' => 'required',
            'features' => 'array',
            'order' => 'integer',
        ]);

        return Service::create($data);
    }

    public function show(Service $service, Request $request)
    {
        $lang = $request->get('lang', 'en');

        return [
            'id' => $service->id,
            'title' => $service["title_$lang"],
            'description' => $service["description_$lang"],
            'icon' => $service->icon,
            'features' => $service->features,
        ];
    }

    public function update(Request $request, Service $service)
    {
        $service->update($request->all());
        return $service;
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
