<?php

namespace App\Catalog\Presentation\Filament\Resources\Moods\Pages;

use App\Catalog\Presentation\Filament\Resources\Moods\MoodResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

final class ManageMoods extends ManageRecords
{
    protected static string $resource = MoodResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Добавить настроение'),
        ];
    }
}
