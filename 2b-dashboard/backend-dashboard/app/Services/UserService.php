<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function index()
    {
        $users = $this->userRepository->getAll();

        return $users->map(function (User $user) {
            return [
                'id' => $user->id,
                'user' => $user->name,
                'email' => $user->email,
                'type' => $user->type,
                'role' => $user->getRoleNames()->first(),
                'status' => $user->status,
                'created_at' => $user->created_at,
            ];
        });
    }

    public function create(array $data): array
    {
        $userFound = $this->userRepository->findByEmail(
            $data['email']
        );

        if ($userFound) {
            return [
                'success' => false,
                'message' => 'User already exists',
                'status' => 409,
            ];
        }

        $user = $this->userRepository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'type' => $data['type'],
            'status' => $data['status'] ?? 'active',
        ]);

        if (!empty($data['role'])) {
            $user->assignRole($data['role']);
        } else {
            $user->assignRole('user');
        }

        $user->load('roles');

        return [
            'success' => true,
            'message' => 'User created successfully.',
            'data' => $this->formatUser($user),
            'status' => 201,
        ];
    }

    public function show(User $user): array
    {
        $user->load('roles');

        return $this->formatUser($user, true);
    }

    public function update(User $user, array $data): array
    {
        $updateData = [];

        if (array_key_exists('name', $data)) {
            $updateData['name'] = $data['name'];
        }

        if (array_key_exists('email', $data)) {
            $updateData['email'] = $data['email'];
        }

        if (array_key_exists('type', $data)) {
            $updateData['type'] = $data['type'];
        }

        if (array_key_exists('status', $data)) {
            $updateData['status'] = $data['status'];
        }

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make(
                $data['password']
            );
        }

        $user = $this->userRepository->update(
            $user,
            $updateData
        );

        if (array_key_exists('role', $data)) {
            $user->syncRoles([$data['role']]);
        }

        $user->load('roles');

        return [
            'success' => true,
            'message' => 'User updated successfully.',
            'data' => $this->formatUser($user),
            'status' => 200,
        ];
    }

    public function delete(User $user): void
    {
        $this->userRepository->delete($user);
    }

    private function formatUser(
        User $user,
        bool $includeCreatedAt = false
    ): array {
        $data = [
            'id' => $user->id,
            'user' => $user->name,
            'email' => $user->email,
            'type' => $user->type,
            'role' => $user->getRoleNames()->first(),
            'status' => $user->status,
        ];

        if ($includeCreatedAt) {
            $data['created_at'] = $user->created_at;
        }

        return $data;
    }
}