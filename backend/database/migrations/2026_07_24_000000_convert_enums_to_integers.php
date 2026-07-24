<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table): void {
            $table->unsignedTinyInteger('status')->default(0)->change();
        });

        Schema::table('composers', function (Blueprint $table): void {
            $table->unsignedTinyInteger('status')->default(0)->change();
        });

        Schema::table('tracks', function (Blueprint $table): void {
            $table->unsignedTinyInteger('status')->default(0)->change();
        });

        Schema::table('playback_sources', function (Blueprint $table): void {
            $table->unsignedTinyInteger('provider')->default(0)->change();
            $table->unsignedTinyInteger('status')->default(0)->change();
        });

        Schema::table('users', function (Blueprint $table): void {
            $table->unsignedTinyInteger('role')->default(0)->change();
        });

        DB::table('games')->where('status', 'draft')->update(['status' => 0]);
        DB::table('games')->where('status', 'published')->update(['status' => 1]);
        DB::table('games')->where('status', 'archived')->update(['status' => 2]);

        DB::table('composers')->where('status', 'draft')->update(['status' => 0]);
        DB::table('composers')->where('status', 'published')->update(['status' => 1]);
        DB::table('composers')->where('status', 'archived')->update(['status' => 2]);

        DB::table('tracks')->where('status', 'draft')->update(['status' => 0]);
        DB::table('tracks')->where('status', 'published')->update(['status' => 1]);
        DB::table('tracks')->where('status', 'archived')->update(['status' => 2]);

        DB::table('playback_sources')->where('provider', 'youtube')->update(['provider' => 0]);
        DB::table('playback_sources')->where('status', 'draft')->update(['status' => 0]);
        DB::table('playback_sources')->where('status', 'published')->update(['status' => 1]);
        DB::table('playback_sources')->where('status', 'archived')->update(['status' => 2]);

        DB::table('users')->where('role', 'editor')->update(['role' => 0]);
        DB::table('users')->where('role', 'administrator')->update(['role' => 1]);
    }

    public function down(): void
    {
        Schema::table('games', function (Blueprint $table): void {
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->change();
        });

        Schema::table('composers', function (Blueprint $table): void {
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->change();
        });

        Schema::table('tracks', function (Blueprint $table): void {
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->change();
        });

        Schema::table('playback_sources', function (Blueprint $table): void {
            $table->enum('provider', ['youtube'])->default('youtube')->change();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->change();
        });

        Schema::table('users', function (Blueprint $table): void {
            $table->enum('role', ['editor', 'administrator'])->default('editor')->change();
        });
    }
};
