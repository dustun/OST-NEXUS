<?php

namespace App\Providers;

use App\Application\Administration\Contracts\AdministratorRepository;
use App\Application\Shared\Contracts\Clock;
use App\Infrastructure\Clock\SystemClock;
use App\Infrastructure\Persistence\Eloquent\Administration\EloquentAdministratorRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            AdministratorRepository::class,
            EloquentAdministratorRepository::class,
        );
        $this->app->bind(Clock::class, SystemClock::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
