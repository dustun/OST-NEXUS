<?php

namespace App\Catalog\Presentation\Filament\Resources\SceneTypes\Pages;

use App\Catalog\Presentation\Filament\Resources\SceneTypes\SceneTypeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

final class ManageSceneTypes extends ManageRecords
{
    protected static string $resource = SceneTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Добавить тип сцены'),
        ];
    }
}
