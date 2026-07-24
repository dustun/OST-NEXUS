<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('original_title')->nullable();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->date('release_date')->nullable();
            $table->text('cover_image_url')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->index();
            $table->timestampTz('published_at')->nullable();
            $table->timestampsTz();
        });

        Schema::create('composers', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('bio')->nullable();
            $table->text('photo_url')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->index();
            $table->timestampTz('published_at')->nullable();
            $table->timestampsTz();
        });

        Schema::create('moods', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('color', 7)->nullable();
            $table->text('description')->nullable();
            $table->timestampsTz();
        });

        Schema::create('scene_types', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestampsTz();
        });

        Schema::create('tracks', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('game_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->unsignedSmallInteger('disc_number')->default(1);
            $table->unsignedSmallInteger('track_number')->nullable();
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_spoiler')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->index();
            $table->timestampTz('published_at')->nullable();
            $table->timestampsTz();

            $table->unique(['game_id', 'slug']);
            $table->unique(['game_id', 'disc_number', 'track_number']);
        });

        Schema::create('composer_track', function (Blueprint $table): void {
            $table->foreignUuid('composer_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();
            $table->string('role')->default('composer');

            $table->primary(['composer_id', 'track_id']);
        });

        Schema::create('mood_track', function (Blueprint $table): void {
            $table->foreignUuid('mood_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();

            $table->primary(['mood_id', 'track_id']);
        });

        Schema::create('scene_type_track', function (Blueprint $table): void {
            $table->foreignUuid('scene_type_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();

            $table->primary(['scene_type_id', 'track_id']);
        });

        Schema::create('playback_sources', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();
            $table->enum('provider', ['youtube'])->default('youtube');
            $table->string('external_id');
            $table->text('source_url')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->index();
            $table->timestampTz('last_checked_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestampsTz();

            $table->unique(['track_id', 'provider', 'external_id']);
            $table->index(['provider', 'external_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('playback_sources');
        Schema::dropIfExists('scene_type_track');
        Schema::dropIfExists('mood_track');
        Schema::dropIfExists('composer_track');
        Schema::dropIfExists('tracks');
        Schema::dropIfExists('scene_types');
        Schema::dropIfExists('moods');
        Schema::dropIfExists('composers');
        Schema::dropIfExists('games');
    }
};
