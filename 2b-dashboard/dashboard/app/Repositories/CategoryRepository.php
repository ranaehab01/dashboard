<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryRepository
{
    public function getAll()
    {
        return DB::table('categories')
            ->leftJoin(
                'products',
                'categories.id',
                '=',
                'products.category_id'
            )
            ->select(
                'categories.id',
                'categories.name',
                'categories.description',
                'categories.created_at',
                DB::raw('COUNT(products.id) as products')
            )
            ->groupBy(
                'categories.id',
                'categories.name',
                'categories.description',
                'categories.created_at'
            )
            ->get();
    }

    public function getById(Category $category): Category
    {
        return $category;
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

public function update(Category $category, array $data): Category
{
    if (isset($data['name'])) {
        $category->setTranslations('name', $data['name']);
    }

    if (isset($data['description'])) {
        $category->setTranslations('description', $data['description']);
    }

    $category->save();

    return $category->fresh();
}    public function delete(Category $category): void
    {
        $category->delete();
    }

    public function hasProducts(Category $category): bool
    {
        return $category->products()->exists();
    }
}