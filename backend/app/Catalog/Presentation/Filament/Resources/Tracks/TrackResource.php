<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Tracks;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Text;
use Filament\Schemas\Components\Textarea;
use Filament\Schemas\Components\Select;
use Filament\Schemas\Components\Toggle;
use Filament\Schemas\Components\TextInput\Numeric;

final class TrackResource extends Resource
{
    protected static ?string $model = Track::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-musical-note';

    protected static ?string $navigationLabel = 'Tracks';

    protected static string|\UnitEnum|null $navigationGroup = 'Catalog';

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('game.title')->label('Game'),
            Tables\Columns\TextColumn::make('disc_number')->label('Disc'),
            Tables\Columns\TextColumn::make('track_number')->label('Track'),
            Tables\Columns\TextColumn::make('duration_seconds')->label('Duration'),
            Tables\Columns\TextColumn::make('status')->badge(),
            Tables\Columns\TextColumn::make('published_at')->dateTime()->sortable(),
        ]);
    }

    public static function formSchema(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Track Info')->schema([
                Text::make('title')->required(),
                Text::make('slug')->required(),
                Text::make('game_id')->label('Game ID')->required(),
                Numeric::make('disc_number')->default(1),
                Numeric::make('track_number')->nullable(),
                Numeric::make('duration_seconds')->nullable(),
                Textarea::make('description')->nullable(),
                Toggle::make('is_spoiler')->label('Spoiler')->default(false),
                Select::make('status')
                    ->options(PublicationStatus::options())
                    ->default(PublicationStatus::Draft->value),
            ]),
        ]);
    }
}
