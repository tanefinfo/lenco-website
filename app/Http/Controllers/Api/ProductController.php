<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        return Product::latest()->get()->map(function ($p) {
            $p->image = $p->image ? asset($p->image) : null;
            return $p;
        });
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::findOrFail($id);
        $product->image = $product->image ? asset($product->image) : null;
        return $product;
    }

    // POST /api/products
    public function store(Request $request)
    {
        $data = $request->validate([
            'name_en' => 'required|string',
            'name_am' => 'nullable|string',
            'name_or' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_am' => 'nullable|string',
            'description_or' => 'nullable|string',
            'full_description_en' => 'nullable|string',
            'full_description_am' => 'nullable|string',
            'full_description_or' => 'nullable|string',
            'category' => 'required|string',
            'price' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'gallery' => 'nullable|array',
        ]);

        // Store image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $product = Product::create($data);
        $product->image = $product->image ? asset($product->image) : null;

        return response()->json($product, 201);
    }

    // PUT /api/products/{id}
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'name_en' => 'required|string',
            'name_am' => 'nullable|string',
            'name_or' => 'nullable|string',
            'category' => 'required|string',
            'price' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        // Replace image if new one uploaded
        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists(str_replace('storage/', '', $product->image))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $product->image));
            }

            $path = $request->file('image')->store('products', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $product->update($data);
        $product->image = $product->image ? asset($product->image) : null;

        return $product;
    }

    // DELETE /api/products/{id}
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::disk('public')->delete(str_replace('storage/', '', $product->image));
        }

        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
