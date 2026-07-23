<?php

namespace Tests\Feature\Administration;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

final class CreateAdministratorCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_command_creates_an_administrator_from_configuration(): void
    {
        config()->set('admin', [
            'name' => 'Nexus Admin',
            'email' => 'admin@example.test',
            'password' => 'x',
        ]);

        $this->artisan('admin:create')->assertSuccessful();

        $administrator = User::query()->sole();

        $this->assertSame('Nexus Admin', $administrator->name);
        $this->assertSame('admin@example.test', $administrator->email);
        $this->assertTrue($administrator->is_admin);
        $this->assertNotNull($administrator->email_verified_at);
        $this->assertTrue(Hash::check('x', $administrator->password));
    }

    public function test_command_updates_existing_administrator_without_duplicates(): void
    {
        config()->set('admin', [
            'name' => 'Nexus Admin',
            'email' => 'admin@example.test',
            'password' => 'first-password-123',
        ]);
        $this->artisan('admin:create')->assertSuccessful();

        config()->set('admin', [
            'name' => 'Updated Admin',
            'email' => 'admin@example.test',
            'password' => 'second-password-456',
        ]);
        $this->artisan('admin:create')->assertSuccessful();

        $administrator = User::query()->sole();

        $this->assertDatabaseCount('users', 1);
        $this->assertSame('Updated Admin', $administrator->name);
        $this->assertTrue(Hash::check('second-password-456', $administrator->password));
    }

    public function test_command_rejects_empty_password(): void
    {
        config()->set('admin', [
            'name' => 'Nexus Admin',
            'email' => 'admin@example.test',
            'password' => '',
        ]);

        $this->artisan('admin:create')->assertFailed();

        $this->assertDatabaseCount('users', 0);
    }
}
