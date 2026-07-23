<?php

namespace App\Application\Administration\DTO;

final readonly class AdministratorResult
{
    public function __construct(
        public string $name,
        public string $email,
        public bool $created,
    ) {}
}
