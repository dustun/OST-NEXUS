<?php

declare(strict_types=1);

namespace App\Catalog\Presentation\Http\Controllers\Api\V1;

use App\Catalog\Domain\Enums\PublicationStatus;
use App\Catalog\Infrastructure\Persistence\Eloquent\Models\Composer;
use App\Catalog\Presentation\Http\Resources\ComposerResource;
use App\Shared\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class ComposerController extends Controller
{
    public function index(): JsonResponse
    {
        $composers = Composer::query()
            ->where('status', PublicationStatus::Published->value)
            ->orderBy('name')
            ->get();

        return response()->json(ComposerResource::collection($composers), 200);
    }
}
