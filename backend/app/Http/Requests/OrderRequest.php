<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'products' => 'required|array|min:1',
            'products.*' => 'required|array|min:2|max:2',
            'products.*.id' => 'required|integer',
            'products.*.quantity' => 'required|integer|min:1',
            'address' => 'required|string|max:127',
            'city' => 'required|string|max:127',
            'postal_code' => 'required|string|max:15',
            'notes' => 'string|max:255',
        ];
    }

    public function attributes(): array
    {
        return [
            'products.*'  => 'product',
            'products.*.id' => 'product id',
            'products.*.quantity' => 'product quantity',
            'postal_code' => 'postal code',
        ];
    }

    public function messages()
    {
        return [
            'products.required' => 'You need at least one product in your order!',
            'products.min' => 'You need at least one product in your order!',

            'products.*.required' => 'You need at least one product in your order!',

            'products.*.quantity.required' => 'The Quantity of the products is required!',
            'products.*.quantity.min' => 'The Quantity of the products needs to be greater than 0!',

            'address.max' => 'The address field may contain up to 127 characters!',

            'city.max' => 'The city name field may contain up to 127 characters!',

            'postal_code.max' => 'The postal code field may contain up to 15 characters!',

            'notes.max' => 'The notes field may contain up to 255 characters!',
        ];
    }
}
