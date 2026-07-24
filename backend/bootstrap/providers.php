<?php

use App\Catalog\Providers\CatalogServiceProvider;
use App\Shared\Presentation\Filament\AdminPanelProvider;
use App\Shared\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,
    CatalogServiceProvider::class,
    AdminPanelProvider::class,
];
