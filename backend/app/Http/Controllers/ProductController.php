<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    public function getAll()
    {
        return Product::all();
    }

    public function getOne($id)
    {
        $product = Product::find($id);
        return response(compact('product'));
    }

    public function create(ProductRequest $request)
    {
        $fields = $request->validated();

        $product = Product::create([
            'name' => $fields['name'],
            'ingredients' => $fields['ingredients'],
            'price' => $fields['price'],
            'img' => $fields['img'],
        ]);

        return response(compact('product'));
    }

    public function update(ProductRequest $request, $id)
    {
        $fields = $request->validated();

        $product = Product::find($id);
        $product->update([
            'name' => $fields['name'],
            'ingredients' => $fields['ingredients'],
            'price' => $fields['price'],
            'img' => $fields['img'],
        ]);

        return response(compact('product'));
    }

    public function delete($id)
    {
        return Product::destroy($id);
    }
}
