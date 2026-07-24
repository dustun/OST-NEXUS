<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources;

use Filament\Resources\Resource;
use UnitEnum;

abstract class CatalogResource extends Resource
{
    protected static string | UnitEnum | null $navigationGroup = 'Каталог';

    protected static bool $hasTitleCaseModelLabel              = false;
}
