<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {

        $permissions = [

            'view products',
            'create products',
            'update products',
            'delete products',

            'view categories',
            'create categories',
            'update categories',
            'delete categories',

            'view users',
            'create users',
            'update users',
            'delete users',


        ];

        foreach ($permissions as $permission) {
            Permission::Create(['name' => $permission, 'guard_name' => 'web',]);
        }

        $admin = Role::Create(['name' => 'admin', 'guard_name' => 'web',]);

        $productManager = Role::Create(['name' => 'product_manager', 'guard_name' => 'web',]);

        $user = Role::Create(['name' => 'user', 'guard_name' => 'web',]);

        $admin->givePermissionTo(Permission::all());

        $productManager->givePermissionTo([
            'view products',
            'create products',
            'update products',
            'delete products',

            'view categories',
            'create categories',
            'update categories',
            'delete categories',
        ]);


        $user->givePermissionTo(['view products',]);
    }
}
