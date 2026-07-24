<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Collections;

use App\Catalog\Domain\Enums\CollectionType;
use App\Catalog\Domain\Enums\CollectionVisibility;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Collection;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Text;
use Filament\Schemas\Components\Textarea;
use Filament\Schemas\Components\Toggle;
use Filament\Schemas\Components\Select;

final class CollectionResource extends Resource
{
    protected static ?string $model = Collection::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-radio';

    protected static ?string $navigationLabel = 'Collections';

    protected static string|\UnitEnum|null $navigationGroup = 'Catalog';

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('type')->badge(),
            Tables\Columns\TextColumn::make('frequency')->label('Frequency'),
            Tables\Columns\IconColumn::make('is_live')->label('Live')->boolean(),
            Tables\Columns\TextColumn::make('status')->badge(),
            Tables\Columns\TextColumn::make('published_at')->dateTime()->sortable(),
        ]);
    }

    public static function formSchema(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Collection Info')->schema([
                Text::make('title')->required(),
                Text::make('slug')->required(),
                Textarea::make('description')->nullable(),
                Text::make('frequency')->nullable(),
                Text::make('color')->nullable(),
                Text::make('currently_playing_track_id')->nullable()->label('Currently Playing Track ID'),
                Select::make('type')
                    ->options(CollectionType::options())
                    ->default(CollectionType::Radio->value),
                Select::make('visibility')
                    ->options(CollectionVisibility::options())
                    ->default(CollectionVisibility::Public->value),
                Toggle::make('is_live')->label('Live')->default(false),
                Select::make('status')
                    ->options(PublicationStatus::options())
                    ->default(PublicationStatus::Draft->value),
            ]),
        ]);
    }

    public static function canCreate(): bool
    {
        return true;
    }

    public static function canEdit(\Illuminate\Database\Eloquent\Model $record): bool
    {
        return true;
    }
}
