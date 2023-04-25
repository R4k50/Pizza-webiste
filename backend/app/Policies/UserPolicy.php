<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function manage(User $user)
    {
        return ($user->isAdmin)
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
