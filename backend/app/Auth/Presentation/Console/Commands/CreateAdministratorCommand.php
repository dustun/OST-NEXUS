<?php

namespace App\Auth\Presentation\Console\Commands;

use App\Auth\Domain\Enums\UserRole;
use Filament\Commands\MakeUserCommand;
use Filament\Facades\Filament;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use InvalidArgumentException;

final class CreateAdministratorCommand extends MakeUserCommand
{
    protected $signature = 'admin:create';

    protected $aliases = [];

    protected $description = 'Создать или обновить администратора из переменных окружения';

    /**
     * @return array<never>
     */
    protected function getOptions(): array
    {
        return [];
    }

    public function handle(): int
    {
        $this->panel = Filament::getPanel('admin', isStrict: false);

        if (! $this->panel) {
            $this->components->error('Панель Filament с идентификатором admin не зарегистрирована.');

            return self::FAILURE;
        }

        try {
            $data = $this->getUserData();
        } catch (InvalidArgumentException $exception) {
            $this->components->error($exception->getMessage());

            return self::FAILURE;
        }

        $administrator = $this->getUserModel()::query()
            ->where('email', $data['email'])
            ->first();
        $created = $administrator === null;
        $administrator ??= new ($this->getUserModel());

        $administrator->forceFill($data)->save();

        $action = $created ? 'создан' : 'обновлён';

        $this->components->info(
            "Администратор {$data['name']} <{$data['email']}> {$action}.",
        );

        return self::SUCCESS;
    }

    /**
     * @return array{
     *     name: string,
     *     email: string,
     *     password: string,
     *     email_verified_at: Carbon,
     *     is_admin: true,
     *     role: UserRole
     * }
     */
    protected function getUserData(): array
    {
        $name = trim((string) config('admin.name', ''));
        $email = strtolower(trim((string) config('admin.email', '')));
        $password = (string) config('admin.password', '');

        if ($name === '') {
            throw new InvalidArgumentException('ADMIN_NAME не может быть пустым.');
        }

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException('ADMIN_EMAIL должен содержать корректный email.');
        }

        if ($password === '') {
            throw new InvalidArgumentException('ADMIN_PASSWORD не может быть пустым.');
        }

        return [
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
            'is_admin' => true,
            'role' => UserRole::Administrator,
        ];
    }
}
