<?php

declare(strict_types=1);

namespace App\Shared\Http\DTO;

final readonly class SystemHealthData
{
    public function __construct(
        public string $service,
        public string $status,
        public string $timestamp,
    ) {}

    /**
     * @return array{service: string, status: string, timestamp: string}
     */
    public function toArray(): array
    {
        return [
            'service'   => $this->service,
            'status'    => $this->status,
            'timestamp' => $this->timestamp,
        ];
    }
}
