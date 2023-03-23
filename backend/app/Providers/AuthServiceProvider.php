<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Product;
use App\Policies\ProductPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Product::class => ProductPolicy::class
    ];

    public function boot(): void
    {
        $this->registerPolicies();
        Gate::define('manage-products', [ProductPolicy::class, 'manage']);
    }
}
