<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\PlaybackSources;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PlaybackProvider;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\PlaybackSource;
use App\Catalog\Presentation\Filament\Resources\CatalogResource;
use App\Catalog\Presentation\Filament\Resources\PlaybackSources\Pages\ManagePlaybackSources;
use App\Catalog\Presentation\Filament\Resources\Support\PublicationUi;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

final class PlaybackSourceResource extends CatalogResource
{
    protected static ?string $model                             = PlaybackSource::class;

    protected static string | BackedEnum | null $navigationIcon = Heroicon::OutlinedPlayCircle;

    protected static ?string $modelLabel                        = 'источник воспроизведения';

    protected static ?string $pluralModelLabel                  = 'Источники воспроизведения';

    protected static ?string $recordTitleAttribute              = 'external_id';

    protected static ?int $navigationSort                       = 60;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('track_id')
                    ->label('Трек')
                    ->relationship('track', 'title')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('provider')
                    ->label('Провайдер')
                    ->options([
                        PlaybackProvider::YouTube->value => 'YouTube',
                    ])
                    ->default(PlaybackProvider::YouTube->value)
                    ->required(),
                TextInput::make('external_id')
                    ->label('YouTube Video ID')
                    ->required()
                    ->length(11)
                    ->rules(['regex:/^[A-Za-z0-9_-]{11}$/']),
                TextInput::make('source_url')
                    ->label('URL источника')
                    ->url(),
                TextInput::make('sort_order')
                    ->label('Приоритет')
                    ->numeric()
                    ->minValue(0)
                    ->default(0)
                    ->required(),
                Toggle::make('is_primary')
                    ->label('Основной источник')
                    ->default(false),
                DateTimePicker::make('last_checked_at')
                    ->label('Последняя проверка'),
                KeyValue::make('metadata')
                    ->label('Метаданные провайдера')
                    ->keyLabel('Ключ')
                    ->valueLabel('Значение')
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('track.title')
                    ->label('Трек')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('provider')
                    ->label('Провайдер')
                    ->formatStateUsing(fn(PlaybackProvider | string $state): string => $state instanceof PlaybackProvider
                        ? 'YouTube'
                        : ucfirst($state))
                    ->badge(),
                TextColumn::make('external_id')
                    ->label('Video ID')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('sort_order')
                    ->label('Приоритет')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_primary')
                    ->label('Основной')
                    ->boolean(),
                PublicationUi::statusColumn(),
            ])
            ->filters([
                SelectFilter::make('provider')
                    ->label('Провайдер')
                    ->options([
                        PlaybackProvider::YouTube->value => 'YouTube',
                    ]),
                PublicationUi::statusFilter(),
            ])
            ->recordActions([
                EditAction::make()->label('Редактировать'),
                ...PublicationUi::actions(CatalogItemType::PlaybackSource),
                DeleteAction::make()->label('Удалить'),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManagePlaybackSources::route('/'),
        ];
    }
}
