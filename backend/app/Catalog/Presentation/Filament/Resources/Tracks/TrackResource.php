<?php

namespace App\Catalog\Presentation\Filament\Resources\Tracks;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Presentation\Filament\Resources\CatalogResource;
use App\Catalog\Presentation\Filament\Resources\Support\PublicationUi;
use App\Catalog\Presentation\Filament\Resources\Tracks\Pages\ManageTracks;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

final class TrackResource extends CatalogResource
{
    protected static ?string $model = Track::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMusicalNote;

    protected static ?string $modelLabel = 'трек';

    protected static ?string $pluralModelLabel = 'Треки';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?int $navigationSort = 20;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('game_id')
                    ->label('Игра')
                    ->relationship('game', 'title')
                    ->searchable()
                    ->preload()
                    ->required(),
                TextInput::make('title')
                    ->label('Название')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug внутри игры')
                    ->required()
                    ->alphaDash()
                    ->maxLength(255),
                TextInput::make('disc_number')
                    ->label('Номер диска')
                    ->numeric()
                    ->minValue(1)
                    ->default(1)
                    ->required(),
                TextInput::make('track_number')
                    ->label('Номер трека')
                    ->numeric()
                    ->minValue(1),
                TextInput::make('duration_seconds')
                    ->label('Длительность, секунд')
                    ->numeric()
                    ->minValue(1),
                Toggle::make('is_spoiler')
                    ->label('Содержит спойлеры')
                    ->default(false),
                Textarea::make('description')
                    ->label('Описание')
                    ->rows(6)
                    ->columnSpanFull(),
                Select::make('composers')
                    ->label('Композиторы')
                    ->relationship('composers', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload(),
                Select::make('moods')
                    ->label('Настроения')
                    ->relationship('moods', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload(),
                Select::make('sceneTypes')
                    ->label('Типы сцен')
                    ->relationship('sceneTypes', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload(),
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
                TextColumn::make('game.title')
                    ->label('Игра')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('track_number')
                    ->label('№')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('duration_seconds')
                    ->label('Длительность')
                    ->formatStateUsing(fn (?int $state): string => self::formatDuration($state)),
                IconColumn::make('is_spoiler')
                    ->label('Спойлер')
                    ->boolean(),
                TextColumn::make('playback_sources_count')
                    ->label('Источников')
                    ->counts('playbackSources'),
                PublicationUi::statusColumn(),
            ])
            ->filters([
                SelectFilter::make('game')
                    ->label('Игра')
                    ->relationship('game', 'title')
                    ->searchable()
                    ->preload(),
                PublicationUi::statusFilter(),
                TernaryFilter::make('is_spoiler')
                    ->label('Спойлеры'),
            ])
            ->recordActions([
                EditAction::make()->label('Редактировать'),
                ...PublicationUi::actions(CatalogItemType::Track),
                DeleteAction::make()->label('Удалить'),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageTracks::route('/'),
        ];
    }

    private static function formatDuration(?int $seconds): string
    {
        if ($seconds === null) {
            return '—';
        }

        return sprintf('%d:%02d', intdiv($seconds, 60), $seconds % 60);
    }
}
