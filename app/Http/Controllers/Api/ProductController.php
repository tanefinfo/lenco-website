<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products
    public function index(Request $request)
    {
        return Product::latest()->get();
    }

    // GET /api/products/{id}
    public function show($id)
    {
        return Product::findOrFail($id);
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
            'image' => 'required|string',
            'gallery' => 'nullable|array'
        ]);

        return Product::create($data);
    }

    // PUT /api/products/{id}
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->all());

        return $product;
    }

    // DELETE /api/products/{id}
    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
