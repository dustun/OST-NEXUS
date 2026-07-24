<?php

declare(strict_types=1);

namespace App\CLI\Commands;

use App\Auth\Infrastructure\Persistence\Model\Admin;
use Filament\Commands\MakeUserCommand;
use Filament\Facades\Filament;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use InvalidArgumentException;

final class CreateAdministratorCommand extends MakeUserCommand
{
    protected $signature   = 'admin:create';

    protected $aliases     = [];

    protected $description = 'Создать или обновить администратора из переменных окружения';

    public function handle(): int
    {
        $this->panel   = Filament::getPanel('admin', isStrict: false);

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

        $administrator = Admin::query()
            ->where('email', $data['email'])
            ->first();
        $created       = $administrator === null;
        $administrator ??= new Admin();

        $administrator->forceFill($data)->save();

        $action        = $created ? 'создан' : 'обновлён';

        $this->components->info(
            "Администратор {$data['name']} <{$data['email']}> {$action}.",
        );

        return self::SUCCESS;
    }

    /**
     * @return array<never>
     */
    protected function getOptions(): array
    {
        return [];
    }

    protected function getUserModel(): string
    {
        return Admin::class;
    }

    /**
     * @return array{
     *     name: string,
     *     email: string,
     *     password: string,
     *     email_verified_at: Carbon,
     * }
     */
    protected function getUserData(): array
    {
        $name     = trim((string) config('admin.name', ''));
        $email    = strtolower(trim((string) config('admin.email', '')));
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
            'name'              => $name,
            'email'             => $email,
            'password'          => Hash::make($password),
            'email_verified_at' => now(),
        ];
    }
}
