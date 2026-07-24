<?php

namespace App\Catalog\Providers;

use App\Catalog\Application\Commands\ChangeCatalogPublicationStatus;
use App\Catalog\Application\Commands\ChangeCatalogPublicationStatusHandler;
use App\Catalog\Application\Contracts\CatalogPublicationRepository;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Mood;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\PlaybackSource;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\SceneType;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use App\Catalog\Presentation\Policies\CatalogPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class CatalogServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            CatalogPublicationRepository::class,
            \App\Catalog\Infrastructure\Repositories\EloquentCatalogPublicationRepository::class,
        );
    }

    public function boot(): void
    {
        foreach ([Game::class, Track::class, Composer::class, Mood::class, SceneType::class, PlaybackSource::class] as $model) {
            Gate::policy($model, CatalogPolicy::class);
        }
    }
}
