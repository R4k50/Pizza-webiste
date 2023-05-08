<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Requests\RegisterRequest;

class UserController extends Controller
{
    function getAll()
    {
        return User::all();
    }

    function getOne($id)
    {
        return User::find($id);
    }

    public function create(UserRequest $request)
    {
        $fields = $request->validated();

        if (array_key_exists('password', $fields))
            $fields['password'] = bcrypt($fields['password']);

        $user = User::create($fields);

        return response(compact('user'));
    }

    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'name' => 'sometimes|required|alpha',
            'surname' => 'sometimes|required|alpha',
            'email' => 'sometimes|required|email|unique:users,email',
            'isAdmin' => 'sometimes|boolean',
            'isDeliveryMan' => 'sometimes|boolean',
        ]);

        $user = User::find($id);
        $user->update($request->all());

        return response(compact('user'));
    }

    public function delete($id)
    {
        return User::destroy($id);
    }
}
