<?php

namespace App\Catalog\Presentation\Filament\Resources\Composers\Pages;

use App\Catalog\Presentation\Filament\Resources\Composers\ComposerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

final class ManageComposers extends ManageRecords
{
    protected static string $resource = ComposerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Добавить композитора'),
        ];
    }
}
