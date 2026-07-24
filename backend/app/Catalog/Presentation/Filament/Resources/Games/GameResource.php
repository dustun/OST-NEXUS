<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Games;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Text;
use Filament\Schemas\Components\Textarea;
use Filament\Schemas\Components\DatePicker;
use Filament\Schemas\Components\Select;
use Filament\Schemas\Components\Toggle;

final class GameResource extends Resource
{
    protected static ?string $model = Game::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Games';

    protected static string|\UnitEnum|null $navigationGroup = 'Catalog';

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('slug')->searchable(),
            Tables\Columns\TextColumn::make('original_title')->label('Original Title'),
            Tables\Columns\TextColumn::make('release_date')->date()->sortable(),
            Tables\Columns\TextColumn::make('status')->badge(),
            Tables\Columns\TextColumn::make('published_at')->dateTime()->sortable(),
        ]);
    }

    public static function formSchema(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Game Info')->schema([
                Text::make('title')->required(),
                Text::make('slug')->required(),
                Text::make('original_title')->nullable(),
                Textarea::make('summary')->nullable(),
                Textarea::make('description')->nullable(),
                DatePicker::make('release_date')->nullable(),
                Text::make('cover_image_url')->nullable(),
                Select::make('status')
                    ->options(PublicationStatus::options())
                    ->default(PublicationStatus::Draft->value),
            ]),
        ]);
    }
}
