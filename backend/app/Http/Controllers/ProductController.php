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

    function getOne($id)
    {
        return Product::find($id);
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

    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'name' => 'sometimes|required|string',
            'ingredients' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|between:0,99.99',
            'img' => 'sometimes|required|string',
        ]);

        $product = Product::find($id);
        $product->update($request->all());

        return response(compact('product'));
    }

    public function delete($id)
    {
        return Product::destroy($id);
    }
}
