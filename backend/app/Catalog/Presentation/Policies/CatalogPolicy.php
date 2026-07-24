<?php

namespace App\Catalog\Presentation\Policies;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Mood;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\PlaybackSource;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\SceneType;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use App\Auth\Infrastructure\Persistence\Model\Admin;
use Illuminate\Database\Eloquent\Model;

final class CatalogPolicy
{
    public function viewAny(Admin $admin): bool
    {
        return true;
    }

    public function view(Admin $admin, Model $record): bool
    {
        return true;
    }

    public function create(Admin $admin): bool
    {
        return true;
    }

    public function update(Admin $admin, Model $record): bool
    {
        if (! $this->hasPublicationStatus($record)) {
            return true;
        }

        return $record->status !== PublicationStatus::Archived;
    }

    public function delete(Admin $admin, Model $record): bool
    {
        if ($this->hasPublicationStatus($record) && $record->status !== PublicationStatus::Draft) {
            return false;
        }

        return ! $this->hasDependentRecords($record);
    }

    public function deleteAny(Admin $admin): bool
    {
        return false;
    }

    public function publish(Admin $admin, Model $record): bool
    {
        return $this->hasPublicationStatus($record)
            && $record->status === PublicationStatus::Draft;
    }

    public function archive(Admin $admin, Model $record): bool
    {
        return $this->hasPublicationStatus($record)
            && $record->status === PublicationStatus::Published;
    }

    private function hasPublicationStatus(Model $record): bool
    {
        return $record instanceof Game
            || $record instanceof Track
            || $record instanceof Composer
            || $record instanceof PlaybackSource;
    }

    private function hasDependentRecords(Model $record): bool
    {
        return match (true) {
            $record instanceof Game => $record->tracks()->exists(),
            $record instanceof Composer,
            $record instanceof Mood,
            $record instanceof SceneType => $record->tracks()->exists(),
            default => false,
        };
    }
}
