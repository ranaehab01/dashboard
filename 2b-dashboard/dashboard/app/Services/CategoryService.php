<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategoryService
{
    public function __construct(
        private CategoryRepository $categoryRepository
    ) {}

    public function index(string $language)
    {
        $categories = $this->categoryRepository->getAll();

        return $categories->map(function ($category) use ($language) {

            $nameTranslations = json_decode(
                $category->name,
                true
            );

            $descriptionTranslations = json_decode(
                $category->description,
                true
            );

            return [
                'id' => $category->id,
                'category' => $nameTranslations[$language] ?? null,
                'description' => $descriptionTranslations[$language] ?? null,
                'products' => $category->products,
                'created_at' => $category->created_at,
            ];
        });
    }

    public function show(Category $category): array
    {
        $category->loadCount('products');

        return [
            'id' => $category->id,
            'name' => $category->getTranslations('name'),
            'description' => $category->getTranslations('description'),
            'products' => $category->products_count,
            'created_at' => $category->created_at,
        ];
    }

    public function create(array $data): Category
    {
        return $this->categoryRepository->create([
            'name' => $data['name'] ?? [],
            'description' => $data['description'] ?? [],
        ]);
    }

    public function update(
        Category $category,
        array $data
    ): Category {
        return $this->categoryRepository->update(
            $category,
            $data
        );
    }

    public function delete(Category $category): array
    {
        if ($this->categoryRepository->hasProducts($category)) {
            return [
                'success' => false,
                'message' => 'Cannot delete this category because it contains products.',
                'status' => 422,
            ];
        }

        $this->categoryRepository->delete($category);

        return [
            'success' => true,
            'message' => 'Category deleted successfully.',
            'status' => 200,
        ];
    }
}