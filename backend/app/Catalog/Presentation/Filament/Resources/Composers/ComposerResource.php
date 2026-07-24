<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Composers;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Presentation\Filament\Resources\CatalogResource;
use App\Catalog\Presentation\Filament\Resources\Composers\Pages\ManageComposers;
use App\Catalog\Presentation\Filament\Resources\Support\PublicationUi;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

final class ComposerResource extends CatalogResource
{
    protected static ?string $model                             = Composer::class;

    protected static string | BackedEnum | null $navigationIcon = Heroicon::OutlinedUserGroup;

    protected static ?string $modelLabel                        = 'композитор';

    protected static ?string $pluralModelLabel                  = 'Композиторы';

    protected static ?string $recordTitleAttribute              = 'name';

    protected static ?int $navigationSort                       = 30;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Имя')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->alphaDash()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Textarea::make('bio')
                    ->label('Биография')
                    ->rows(8)
                    ->columnSpanFull(),
                TextInput::make('photo_url')
                    ->label('URL фотографии')
                    ->url()
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Имя')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable(),
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
                ...PublicationUi::actions(CatalogItemType::Composer),
                DeleteAction::make()->label('Удалить'),
            ])
            ->defaultSort('name');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageComposers::route('/'),
        ];
    }
}
