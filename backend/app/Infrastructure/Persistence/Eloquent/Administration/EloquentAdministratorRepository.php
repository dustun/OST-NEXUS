<?php

namespace App\Infrastructure\Persistence\Eloquent\Administration;

use App\Application\Administration\Contracts\AdministratorRepository;
use App\Application\Administration\DTO\AdministratorCredentials;
use App\Application\Administration\DTO\AdministratorResult;
use App\Models\User;

final class EloquentAdministratorRepository implements AdministratorRepository
{
    public function upsert(AdministratorCredentials $credentials): AdministratorResult
    {
        $administrator = User::query()
            ->where('email', $credentials->email)
            ->first();
        $created = $administrator === null;
        $administrator ??= new User;

        $administrator->forceFill([
            'name' => $credentials->name,
            'email' => $credentials->email,
            'password' => $credentials->password,
            'email_verified_at' => now(),
            'is_admin' => true,
        ])->save();

        return new AdministratorResult(
            name: $administrator->name,
            email: $administrator->email,
            created: $created,
        );
    }
}
