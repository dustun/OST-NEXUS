<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Filament\Resources\Support;

use App\Catalog\Application\Commands\ChangeCatalogPublicationStatus;
use App\Catalog\Application\Commands\ChangeCatalogPublicationStatusHandler;
use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;
use DomainException;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Model;

final class PublicationUi
{
    public static function statusColumn(): TextColumn
    {
        return TextColumn::make('status')
            ->label('Статус')
            ->badge()
            ->formatStateUsing(fn ($status) => self::label($status))
            ->color(fn ($status) => self::color($status))
            ->sortable();
    }

    public static function statusFilter(): SelectFilter
    {
        return SelectFilter::make('status')
            ->label('Статус')
            ->options(self::options());
    }

    /**
     * @return array<Action>
     */
    public static function actions(CatalogItemType $type): array
    {
        return [
            Action::make('publish')
                ->label('Опубликовать')
                ->icon(Heroicon::OutlinedCheckCircle)
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Опубликовать запись?')
                ->authorize('publish')
                ->visible(fn(Model $record): bool => $record->getAttribute('status') === PublicationStatus::Published
                    ? false
                    : $record->getAttribute('status') === PublicationStatus::Draft)
                ->action(fn(Model $record) => self::changeStatus(
                    record: $record,
                    type: $type,
                    target: PublicationStatus::Published,
                )),
            Action::make('archive')
                ->label('Архивировать')
                ->icon(Heroicon::OutlinedArchiveBox)
                ->color('warning')
                ->requiresConfirmation()
                ->modalHeading('Архивировать запись?')
                ->authorize('archive')
                ->visible(fn(Model $record): bool => $record->getAttribute('status') === PublicationStatus::Published)
                ->action(fn(Model $record) => self::changeStatus(
                    record: $record,
                    type: $type,
                    target: PublicationStatus::Archived,
                )),
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function options(): array
    {
        return [
            PublicationStatus::Draft->value     => 'Черновик',
            PublicationStatus::Published->value => 'Опубликовано',
            PublicationStatus::Archived->value  => 'В архиве',
        ];
    }

    public static function label(PublicationStatus | int $status): string
    {
        $status = is_int($status) ? PublicationStatus::from($status) : $status;

        return self::options()[$status->value];
    }

    public static function color(PublicationStatus | int $status): string
    {
        $status = is_int($status) ? PublicationStatus::from($status) : $status;

        return match ($status) {
            PublicationStatus::Draft     => 'gray',
            PublicationStatus::Published => 'success',
            PublicationStatus::Archived  => 'warning',
        };
    }

    private static function changeStatus(
        Model $record,
        CatalogItemType $type,
        PublicationStatus $target,
    ): void {
        try {
            app(ChangeCatalogPublicationStatusHandler::class)->handle(
                new ChangeCatalogPublicationStatus(
                    type: $type,
                    id: (string) $record->getKey(),
                    target: $target,
                ),
            );
        } catch (DomainException $exception) {
            Notification::make()
                ->danger()
                ->title('Статус не изменён')
                ->body($exception->getMessage())
                ->send();

            return;
        }

        $record->refresh();

        Notification::make()
            ->success()
            ->title($target === PublicationStatus::Published ? 'Запись опубликована' : 'Запись архивирована')
            ->send();
    }
}
