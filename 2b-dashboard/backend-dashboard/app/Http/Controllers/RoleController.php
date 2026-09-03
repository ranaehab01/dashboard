<?php

namespace App\Http\Controllers;

use App\Services\RoleService;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct(
        private RoleService $roleService
    ) {}

    public function index()
    {
        $roles = $this->roleService->index();

        return response()->json([
            'success' => true,
            'data' => $roles,
        ]);
    }

    public function show(Role $role)
    {
        $role = $this->roleService->show($role);

        return response()->json([
            'success' => true,
            'data' => $role,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role = $this->roleService->create(
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role,
        ], 201);
    }

    public function update(
        Request $request,
        Role $role
    ) {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id,
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role = $this->roleService->update(
            $role,
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role,
        ]);
    }

    public function destroy(Role $role)
    {
        $this->roleService->delete($role);

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully',
        ]);
    }
}