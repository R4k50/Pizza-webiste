<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Policies\ProductPolicy;
use App\Policies\OrderPolicy;
use App\Policies\UserPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Product::class => ProductPolicy::class,
        Order::class => OrderPolicy::class,
        User::class => UserPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('manage-products', [ProductPolicy::class, 'manage']);

        Gate::define('manage-orders', [OrderPolicy::class, 'manage']);
        Gate::define('manage-delivery', [OrderPolicy::class, 'manageDelivery']);

        Gate::define('manage-users', [OrderPolicy::class, 'manage']);
    }
}
