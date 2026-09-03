<?php

namespace App\Services;


use App\Repositories\RoleRepository;
use Spatie\Permission\Models\Role;

class RoleService
{
    public function __construct(
        private RoleRepository $roleRepository
    ) {}

    public function index()
    {
        return $this->roleRepository->getAll();
    }

    public function show(Role $role): Role
    {
        return $this->roleRepository->find($role);
    }

    public function create(array $data): Role
    {
        $role = $this->roleRepository->create([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);

        if (!empty($data['permissions'])) {
            $this->roleRepository->syncPermissions(
                $role,
                $data['permissions']
            );
        }

        return $this->roleRepository->find($role);
    }

   public function update(
    Role $role,
    array $data
): Role {
    $this->roleRepository->update($role, [
        'name' => $data['name'],
    ]);

    if (array_key_exists('permissions', $data)) {
        $this->roleRepository->syncPermissions(
            $role,
            $data['permissions']
        );
    }

    return $this->roleRepository->find($role);
}
    public function delete(Role $role): void
    {
        $this->roleRepository->delete($role);
    }
}