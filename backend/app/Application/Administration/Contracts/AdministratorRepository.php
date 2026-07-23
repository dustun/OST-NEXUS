<?php

namespace App\Application\Administration\Contracts;

use App\Application\Administration\DTO\AdministratorCredentials;
use App\Application\Administration\DTO\AdministratorResult;

interface AdministratorRepository
{
    public function upsert(AdministratorCredentials $credentials): AdministratorResult;
}
