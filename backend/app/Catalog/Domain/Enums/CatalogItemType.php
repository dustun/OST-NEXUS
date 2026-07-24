<?php

namespace App\Catalog\Domain\Enums;

enum CatalogItemType: string
{
    case Game = 'game';
    case Track = 'track';
    case Composer = 'composer';
    case PlaybackSource = 'playback_source';
}
