<?php

namespace App\Catalog\Presentation\Filament\Resources\Moods;

use App\Catalog\Presentation\Filament\Resources\CatalogResource;
use App\Catalog\Presentation\Filament\Resources\Moods\Pages\ManageMoods;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Mood;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

final class MoodResource extends CatalogResource
{
    protected static ?string $model = Mood::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedFaceSmile;

    protected static ?string $modelLabel = 'настроение';

    protected static ?string $pluralModelLabel = 'Настроения';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?int $navigationSort = 40;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Название')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->alphaDash()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                ColorPicker::make('color')
                    ->label('Цвет'),
                Textarea::make('description')
                    ->label('Описание')
                    ->rows(5)
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ColorColumn::make('color')->label('Цвет'),
                TextColumn::make('name')
                    ->label('Название')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable(),
                TextColumn::make('tracks_count')
                    ->label('Треков')
                    ->counts('tracks'),
            ])
            ->recordActions([
                EditAction::make()->label('Редактировать'),
                DeleteAction::make()->label('Удалить'),
            ])
            ->defaultSort('name');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageMoods::route('/'),
        ];
    }
}
