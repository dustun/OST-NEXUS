<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('collections', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedTinyInteger('type')->default(0)->index();
            $table->unsignedTinyInteger('visibility')->default(0)->index();
            $table->string('owner_type')->nullable();
            $table->string('owner_id')->nullable();
            $table->text('cover_image_url')->nullable();
            $table->boolean('is_live')->default(false)->index();
            $table->string('frequency')->nullable();
            $table->string('color', 7)->nullable();
            $table->foreignUuid('currently_playing_track_id')->nullable()->constrained('tracks')->nullOnDelete();
            $table->unsignedTinyInteger('status')->default(0)->index();
            $table->timestampTz('published_at')->nullable();
            $table->timestampsTz();

            $table->index(['owner_type', 'owner_id']);
        });

        Schema::create('collection_items', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('collection_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->text('note')->nullable();
            $table->timestampsTz();

            $table->unique(['collection_id', 'track_id']);
            $table->index(['collection_id', 'sort_order']);
        });

        Schema::create('user_favorites', function (Blueprint $table): void {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();
            $table->timestampTz('added_at');

            $table->primary(['user_id', 'track_id']);
            $table->index('added_at');
        });

        Schema::create('user_queue_items', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestampTz('added_at');

            $table->index(['user_id', 'sort_order']);
        });

        Schema::create('user_play_history', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('track_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('play_count')->default(1);
            $table->timestampTz('last_played_at');

            $table->index(['user_id', 'last_played_at']);
            $table->unique(['user_id', 'track_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_play_history');
        Schema::dropIfExists('user_queue_items');
        Schema::dropIfExists('user_favorites');
        Schema::dropIfExists('collection_items');
        Schema::dropIfExists('collections');
    }
};
