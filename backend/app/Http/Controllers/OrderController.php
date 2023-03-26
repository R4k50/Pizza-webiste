<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderedProduct;
use App\Http\Requests\OrderRequest;

class OrderController extends Controller
{
    function create(OrderRequest $request)
    {
        $fields = $request->validated();
        $user = $request->user();

        $products = $fields['products'];
        $notes = isset($fields['notes']) ? $fields['notes'] : NULL;

        $order = Order::create([
            'user_id' => $user->id,
            'address' => $fields['address'],
            'city' => $fields['city'],
            'postal_code' => $fields['postal_code'],
            'notes' => $notes,
        ]);

        foreach ($products as $product)
        {
            OrderedProduct::create([
                'order_id' => $order->id,
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
            ]);
        }

        return response(compact('order'));
    }

    function getAll()
    {
        return Order::all();
    }

    function getAllAssigned(Request $request)
    {
        $deliveryManId = $request->user()->id;
        $orders = Order::where('delivery_man_id', $deliveryManId)->get();

        return response(compact('orders'));
    }

    function assign(Request $request, $id)
    {
        $deliveryManId = $request->user()->id;
        $order = Order::find($id);

        if(isset($order->delivery_man_id))
            return response('This order is already assigned!', 400);

        $order->update([
            'delivery_man_id' => $deliveryManId,
        ]);

        return response(compact('order'));
    }

    function deleteAssigned(Request $request, $id)
    {
        $deliveryManId = $request->user()->id;
        $order = Order::find($id);

        if ($order->delivery_man_id !== $deliveryManId)
            return response('This order is not assigned to you!', 400);

        return Order::destroy($id);
    }
}
