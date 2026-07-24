<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Games\Pages;

use App\Catalog\Presentation\Filament\Resources\Games\GameResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

final class ManageGames extends ManageRecords
{
    protected static string $resource = GameResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Добавить игру'),
        ];
    }
}
