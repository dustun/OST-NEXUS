<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Services;

use App\Catalog\Domain\Enums\CatalogItemType;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Domain\ValueObjects\TrackPublicationReadiness;
use DomainException;
use LogicException;

final class PublicationPolicy
{
    public function ensureTransitionAllowed(
        CatalogItemType $type,
        PublicationStatus $current,
        PublicationStatus $target,
        ?TrackPublicationReadiness $trackReadiness = null,
    ): void {
        if ($current === $target) {
            return;
        }

        if (! $current->canTransitionTo($target)) {
            throw new DomainException(
                "Переход публикации {$current->value} → {$target->value} запрещён.",
            );
        }

        if ($type !== CatalogItemType::Track || $target !== PublicationStatus::Published) {
            return;
        }

        if ($trackReadiness === null) {
            throw new LogicException('Для публикации трека требуется проверка полноты данных.');
        }

        $trackReadiness->ensureReady();
    }
}
