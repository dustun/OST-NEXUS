<?php

namespace App\Application\Administration\Commands;

use App\Application\Administration\Contracts\AdministratorRepository;
use App\Application\Administration\DTO\AdministratorCredentials;
use App\Application\Administration\DTO\AdministratorResult;

final readonly class UpsertAdministratorHandler
{
    public function __construct(
        private AdministratorRepository $administrators,
    ) {}

    public function handle(AdministratorCredentials $credentials): AdministratorResult
    {
        return $this->administrators->upsert($credentials);
    }
}
