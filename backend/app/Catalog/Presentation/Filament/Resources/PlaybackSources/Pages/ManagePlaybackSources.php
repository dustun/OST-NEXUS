<?php

namespace App\Catalog\Presentation\Filament\Resources\PlaybackSources\Pages;

use App\Catalog\Presentation\Filament\Resources\PlaybackSources\PlaybackSourceResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

final class ManagePlaybackSources extends ManageRecords
{
    protected static string $resource = PlaybackSourceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Добавить источник'),
        ];
    }
}
