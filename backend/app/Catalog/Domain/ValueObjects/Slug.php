<?php

namespace App\Catalog\Domain\ValueObjects;

use InvalidArgumentException;
use Stringable;

final readonly class Slug implements Stringable
{
    private const SLUG_PATTERN = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

    private function __construct(private string $value) {}

    public static function fromString(string $value): self
    {
        $normalized = strtolower(trim($value));

        if (preg_match(self::SLUG_PATTERN, $normalized) !== 1) {
            throw new InvalidArgumentException('Slug может содержать латинские буквы, цифры и одиночные дефисы.');
        }

        return new self($normalized);
    }

    public function __toString(): string
    {
        return $this->value;
    }
}
