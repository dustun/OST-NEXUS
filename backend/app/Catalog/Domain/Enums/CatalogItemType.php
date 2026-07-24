<?php

declare(strict_types=1);

namespace App\Catalog\Domain\Enums;

enum CatalogItemType: string
{
    case Game           = 'game';
    case Track          = 'track';
    case Composer       = 'composer';
    case PlaybackSource = 'playback_source';
}
