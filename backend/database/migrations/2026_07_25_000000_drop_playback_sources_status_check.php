<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        $connection = Schema::getConnection();
        $driver = $connection->getDriverName();

        if ($driver === 'pgsql') {
            $constraint = $connection->getDoctrineSchemaManager()
                ->listTableConstraints('playback_sources');

            foreach ($constraint as $c) {
                if (str_contains($c, 'status')) {
                    DB::statement("ALTER TABLE playback_sources DROP CONSTRAINT IF EXISTS {$c}");
                }
            }
        }
    }

    public function down(): void
    {
        // no-op
    }
};
