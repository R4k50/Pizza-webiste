<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'ingredients' => 'required|string',
            'price' => 'required|numeric|between:0,99.99',
            'img' => 'required|string',
        ];
    }
}
