<?php

namespace App\Application\Administration\DTO;

use InvalidArgumentException;

final readonly class AdministratorCredentials
{
    public string $name;

    public string $email;

    public string $password;

    public function __construct(string $name, string $email, string $password)
    {
        $name = trim($name);
        $email = strtolower(trim($email));

        if ($name === '') {
            throw new InvalidArgumentException('ADMIN_NAME не может быть пустым.');
        }

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException('ADMIN_EMAIL должен содержать корректный email.');
        }

        if (mb_strlen($password) < 12) {
            throw new InvalidArgumentException('ADMIN_PASSWORD должен содержать не менее 12 символов.');
        }

        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }
}
