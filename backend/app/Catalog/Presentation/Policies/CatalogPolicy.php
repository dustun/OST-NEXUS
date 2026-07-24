<?php

namespace App\Catalog\Presentation\Policies;

use App\Auth\Domain\Enums\UserRole;
use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Game;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Mood;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\PlaybackSource;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\SceneType;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Track;
use App\Auth\Infrastructure\Persistence\Model\User;
use Illuminate\Database\Eloquent\Model;

final class CatalogPolicy
{
    public function viewAny(User $user): bool
    {
        return $this->isPanelUser($user);
    }

    public function view(User $user, Model $record): bool
    {
        return $this->isPanelUser($user);
    }

    public function create(User $user): bool
    {
        return $this->isPanelUser($user);
    }

    public function update(User $user, Model $record): bool
    {
        if (! $this->isPanelUser($user)) {
            return false;
        }

        if (! $this->hasPublicationStatus($record)) {
            return true;
        }

        return $record->status !== PublicationStatus::Archived
            || $user->role === UserRole::Administrator;
    }

    public function delete(User $user, Model $record): bool
    {
        if ($user->role !== UserRole::Administrator) {
            return false;
        }

        if ($this->hasPublicationStatus($record) && $record->status !== PublicationStatus::Draft) {
            return false;
        }

        return ! $this->hasDependentRecords($record);
    }

    public function deleteAny(User $user): bool
    {
        return false;
    }

    public function publish(User $user, Model $record): bool
    {
        return $user->role === UserRole::Administrator
            && $this->hasPublicationStatus($record)
            && $record->status === PublicationStatus::Draft;
    }

    public function archive(User $user, Model $record): bool
    {
        return $user->role === UserRole::Administrator
            && $this->hasPublicationStatus($record)
            && $record->status === PublicationStatus::Published;
    }

    private function isPanelUser(User $user): bool
    {
        return $user->is_admin
            && in_array($user->role, [UserRole::Administrator, UserRole::Editor], true);
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
