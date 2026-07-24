<?php

namespace App\Shared\Providers;

use App\Catalog\Application\Contracts\CatalogPublicationRepository;
use App\Shared\Contracts\Clock;
use App\Shared\Infrastructure\Clock\SystemClock;
use App\Catalog\Infrastructure\Repositories\EloquentCatalogPublicationRepository;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Mood;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\PlaybackSource;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\SceneType;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use App\Catalog\Presentation\Policies\CatalogPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            CatalogPublicationRepository::class,
            EloquentCatalogPublicationRepository::class,
        );
        $this->app->bind(Clock::class, SystemClock::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        foreach ([Game::class, Track::class, Composer::class, Mood::class, SceneType::class, PlaybackSource::class] as $model) {
            Gate::policy($model, CatalogPolicy::class);
        }
    }
}
