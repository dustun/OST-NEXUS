<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Tracks\Pages;

use App\Catalog\Presentation\Filament\Resources\Tracks\TrackResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

final class ManageTracks extends ManageRecords
{
    protected static string $resource = TrackResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Добавить трек'),
        ];
    }
}
