<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    public function index(Request $request)
    {
        $language = $request->header(
            'Accept-Language',
            'en'
        );

        $data = $this->categoryService->index($language);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function show(Category $category)
    {
        $data = $this->categoryService->show($category);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name.en' => 'nullable|string',
            'name.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'description.ar' => 'nullable|string',
        ]);

        $category = $this->categoryService->create(
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    public function update(
        Request $request,
        Category $category
    ) {
        $data = $request->all();

        $category = $this->categoryService->update(
            $category,
            $data
        );

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ]);
    }

    public function destroy(Category $category)
    {
        $result = $this->categoryService->delete($category);

        return response()->json([
            'success' => $result['success'],
            'message' => $result['message'],
        ], $result['status']);
    }
}
