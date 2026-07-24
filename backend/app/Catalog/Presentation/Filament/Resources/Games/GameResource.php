<?php

namespace App\Catalog\Presentation\Filament\Resources\Games;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Presentation\Filament\Resources\CatalogResource;
use App\Catalog\Presentation\Filament\Resources\Games\Pages\ManageGames;
use App\Catalog\Presentation\Filament\Resources\Support\PublicationUi;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

final class GameResource extends CatalogResource
{
    protected static ?string $model = Game::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedFilm;

    protected static ?string $modelLabel = 'игра';

    protected static ?string $pluralModelLabel = 'Игры';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Название')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->alphaDash()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                TextInput::make('original_title')
                    ->label('Оригинальное название')
                    ->maxLength(255),
                DatePicker::make('release_date')
                    ->label('Дата выхода'),
                Textarea::make('summary')
                    ->label('Краткое описание')
                    ->rows(3)
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->label('Полное описание')
                    ->rows(8)
                    ->columnSpanFull(),
                TextInput::make('cover_image_url')
                    ->label('URL обложки')
                    ->url()
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Название')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('release_date')
                    ->label('Дата выхода')
                    ->date('d.m.Y')
                    ->sortable(),
                TextColumn::make('tracks_count')
                    ->label('Треков')
                    ->counts('tracks'),
                PublicationUi::statusColumn(),
            ])
            ->filters([
                PublicationUi::statusFilter(),
            ])
            ->recordActions([
                EditAction::make()->label('Редактировать'),
                ...PublicationUi::actions(CatalogItemType::Game),
                DeleteAction::make()->label('Удалить'),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageGames::route('/'),
        ];
    }
}
