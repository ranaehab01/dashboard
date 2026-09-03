<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductImage;

class ProductRepository
{
    public function getAll()
    {
        return Product::with([
            'category',
            'subImages'
        ])->get();
    }

    public function getById(int $id): Product
    {
        return Product::with([
            'category',
            'subImages'
        ])->findOrFail($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(
        Product $product,
        array $data
    ): Product {
        $product->update($data);

        return $product->fresh([
            'category',
            'subImages'
        ]);
    }

    public function createImage(
        Product $product,
        string $image
    ): ProductImage {
        return $product->subImages()->create([
            'image' => $image,
        ]);
    }

    public function deleteImage(
        ProductImage $image
    ): void {
        $image->delete();
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }
}