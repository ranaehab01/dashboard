<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name',
        'description',
    ];


    public array $translatable = [  //b2ol l laravel el fields dee leha translation
        'name',
        'description',
    ];

    public function products(): HasMany   // category feeh aktr mn product(one to many)
    {
        return $this->hasMany(Product::class);
    }
}
