<?php

declare(strict_types=1);

namespace App\Catalog\Domain\ValueObjects;

use DomainException;

final readonly class TrackPublicationReadiness
{
    public function __construct(
        private bool $hasPublishedGame,
        private bool $hasPublishedComposer,
        private bool $hasMood,
        private bool $hasSceneType,
        private bool $hasPublishedSource,
    ) {}

    /**
     * @return array<string>
     */
    public function missingRequirements(): array
    {
        $missing = [];

        if (! $this->hasPublishedGame) {
            $missing[] = 'опубликованная игра';
        }

        if (! $this->hasPublishedComposer) {
            $missing[] = 'опубликованный композитор';
        }

        if (! $this->hasMood) {
            $missing[] = 'настроение';
        }

        if (! $this->hasSceneType) {
            $missing[] = 'тип сцены';
        }

        if (! $this->hasPublishedSource) {
            $missing[] = 'опубликованный источник воспроизведения';
        }

        return $missing;
    }

    public function ensureReady(): void
    {
        $missing = $this->missingRequirements();

        if ($missing === []) {
            return;
        }

        throw new DomainException(
            'Трек нельзя опубликовать. Не заполнено: ' . implode(', ', $missing) . '.',
        );
    }
}
