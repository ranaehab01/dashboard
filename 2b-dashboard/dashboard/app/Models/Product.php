<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable= [
        'category_id',
        'image',
        'name',
        'price',
        'stock',
        'status',
    ];

    public function category()  // product wa7d belong to category wa7d
    {
        return $this->belongsTo(Category::class);
    }

        // Product has many sub images
       public function subImages(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
}
