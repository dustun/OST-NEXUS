<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::getConnection()->getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE playback_sources DROP CONSTRAINT IF EXISTS playback_sources_status_check');
        }
    }

    public function down(): void
    {
        // no-op
    }
};
