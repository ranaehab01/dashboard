<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductImage;
use Spatie\Permission\Models\Role;

class RoleRepository
{
    public function getAll()
    {
        return Role::with('permissions')->get();
    }

    public function find(Role $role): Role
    {
        return $role->load('permissions');
    }

    public function create(array $data): Role
    {
        return Role::create($data);
    }

    public function update(Role $role, array $data): Role
    {
        $role->update($data);

        return $role->fresh();
    }

    public function delete(Role $role): void
    {
        $role->delete();
    }

    public function syncPermissions(
        Role $role,
        array $permissions
    ): void {
        $role->syncPermissions($permissions);
    }

        public function deleteImage(ProductImage $image): void
    {
        $image->delete();
    }
     public function createImage(
        Product $product,
        string $image
    ): ProductImage {
        return $product->subImages()->create([
            'image' => $image,
        ]);
    }
}