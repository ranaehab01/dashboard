<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Repositories\ProductRepository;

class ProductService
{
    public function __construct(
        private ProductRepository $productRepository
    ) {}


    public function index()
    {
        return $this->productRepository->getAll();
    }


    public function show(Product $product): Product
    {
        $product->load([
            'category',
            'subImages'
        ]);

        return $product;
    }

    public function create(array $data): Product
    {

        $product = $this->productRepository->create([
            'category_id' => $data['category_id'],
            'image' => $data['image'] ?? null,
            'name' => $data['name'],
            'price' => $data['price'],
            'stock' => $data['stock'],
            'status' => $data['status'] ?? 'active',
        ]);

        if (!empty($data['sub_images'])) {

            foreach ($data['sub_images'] as $image) {

                $this->productRepository->createImage(
                    $product,
                    $image
                );
            }
        }



        $product->load([
            'category',
            'subImages'
        ]);

        return $product;
    }


    public function update(
        Product $product,
        array $data
    ): Product {

        $allowedData = [];



        if (array_key_exists('category_id', $data)) {

            $allowedData['category_id'] =
                $data['category_id'];
        }



        if (array_key_exists('name', $data)) {

            $allowedData['name'] =
                $data['name'];
        }



        if (array_key_exists('price', $data)) {

            $allowedData['price'] =
                $data['price'];
        }



        if (array_key_exists('stock', $data)) {

            $allowedData['stock'] =
                $data['stock'];
        }



        if (array_key_exists('status', $data)) {

            $allowedData['status'] =
                $data['status'];
        }



        if (array_key_exists('image', $data)) {

            $allowedData['image'] =
                $data['image'];
        }



        if (!empty($allowedData)) {

            $this->productRepository->update(
                $product,
                $allowedData
            );
        }



        if (!empty($data['sub_images'])) {

            foreach ($data['sub_images'] as $image) {

                $this->productRepository->createImage(
                    $product,
                    $image
                );
            }
        }



        $product->load([
            'category',
            'subImages'
        ]);

        return $product;
    }


    public function delete(Product $product): void
    {


        $this->productRepository->delete($product);
    }


    public function deleteImage(
        ProductImage $image
    ): void {



        $this->productRepository->deleteImage(
            $image
        );
    }
}
