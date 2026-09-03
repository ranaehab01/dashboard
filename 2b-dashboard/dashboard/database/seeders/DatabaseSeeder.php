<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        $admin = User::updateOrCreate(
            [
                'email' => 'admin@gmail.com',
            ],
            [
                'name' => 'Admin',
                'type' => 'admin',
                'status' => 'active',
                'password' => Hash::make('admin'),
            ]
        );

        $admin->syncRoles(['admin']);


        $productManager = User::updateOrCreate(
            [
                'email' => 'product_manager@gmail.com',
            ],
            [
                'name' => 'Product Manager',
                'type' => 'product_manager',
                'status' => 'active',
                'password' => Hash::make('product_manager'),
            ]
        );

        $productManager->syncRoles(['product_manager']);


        
    }
}