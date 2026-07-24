<?php

use App\Auth\Domain\Enums\UserRole;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->enum('role', ['editor', 'administrator'])->default('editor')->after('is_admin');
        });

        DB::table('users')
            ->where('is_admin', true)
            ->update(['role' => \App\Auth\Domain\Enums\UserRole::Administrator->value]);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn('role');
        });
    }
};
