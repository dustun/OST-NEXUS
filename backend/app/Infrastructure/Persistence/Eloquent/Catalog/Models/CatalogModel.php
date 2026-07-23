<?php

namespace App\Infrastructure\Persistence\Eloquent\Catalog\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

abstract class CatalogModel extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';
}
