<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class OrderPolicy
{
    public function manage(User $user)
    {
        return ($user->isAdmin || $user->isDeliveryMan)
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
