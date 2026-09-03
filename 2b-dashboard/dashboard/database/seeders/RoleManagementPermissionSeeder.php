<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleManagementPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'view roles',
            'create roles',
            'update roles',
            'delete roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $admin = Role::findByName('admin', 'web');

        $admin->givePermissionTo($permissions);
    }
}