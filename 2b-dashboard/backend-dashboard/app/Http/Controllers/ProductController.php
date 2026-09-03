<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index()
    {
        $products = $this->productService->index();

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'stock' => [
                'required',
                'integer',
                'min:0',
            ],

            'status' => [
                'nullable',
                'string',
            ],

            'image' => [
                'nullable',
                'url',
            ],

            'sub_images' => [
                'nullable',
                'array',
            ],

            'sub_images.*' => [
                'url',
            ],
        ]);

        $product = $this->productService->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully.',
            'data' => $product,
        ], 201);
    }

    public function show(Product $product)
    {
        $product = $this->productService->show($product);

        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    public function update(
        Request $request,
        Product $product
    ) {
        $data = $request->validate([
            'category_id' => [
                'sometimes',
                'exists:categories,id',
            ],

            'name' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'price' => [
                'sometimes',
                'numeric',
                'min:0',
            ],

            'stock' => [
                'sometimes',
                'integer',
                'min:0',
            ],

            'status' => [
                'sometimes',
                'string',
            ],

            'image' => [
                'sometimes',
                'nullable',
                'url',
            ],

            'sub_images' => [
                'sometimes',
                'nullable',
                'array',
            ],

            'sub_images.*' => [
                'url',
            ],
        ]);

        $product = $this->productService->update(
            $product,
            $data
        );

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully.',
            'data' => $product,
        ]);
    }

    public function destroy(Product $product)
    {
        $this->productService->delete($product);

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully.',
        ]);
    }
    public function destroyImage(ProductImage $image)
    {
        $this->productService->deleteImage($image);

        return response()->json([
            'success' => true,
            'message' => 'Product image deleted successfully.',
        ]);
    }
}
