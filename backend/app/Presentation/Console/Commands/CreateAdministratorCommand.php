<?php

namespace App\Presentation\Console\Commands;

use App\Application\Administration\Commands\UpsertAdministratorHandler;
use App\Application\Administration\DTO\AdministratorCredentials;
use Illuminate\Console\Command;
use InvalidArgumentException;

final class CreateAdministratorCommand extends Command
{
    protected $signature = 'admin:create';

    protected $description = 'Создать или обновить администратора из переменных окружения';

    public function handle(UpsertAdministratorHandler $handler): int
    {
        try {
            $credentials = new AdministratorCredentials(
                name: (string) config('admin.name', ''),
                email: (string) config('admin.email', ''),
                password: (string) config('admin.password', ''),
            );
        } catch (InvalidArgumentException $exception) {
            $this->components->error($exception->getMessage());

            return self::FAILURE;
        }

        $result = $handler->handle($credentials);
        $action = $result->created ? 'создан' : 'обновлён';

        $this->components->info(
            "Администратор {$result->name} <{$result->email}> {$action}.",
        );

        return self::SUCCESS;
    }
}
