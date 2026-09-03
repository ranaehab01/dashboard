<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        private AuthRepository $authRepository
    ) {}

    public function register(array $data): User
    {
        $user = $this->authRepository->createUser([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'type' => 'customer',
            'status' => 'active',
        ]);

        $user->assignRole('user');

        return $user;
    }
    public function login(
        string $email,
        string $password
    ): array {

        // Find user
        $user = $this->authRepository
            ->findByEmail($email);


        if (
            !$user ||
            !Hash::check(
                $password,
                $user->password
            )
        ) {

            return [
                'success' => false,

                'message' =>
                'The email or password is incorrect.',

                'status' => 401,
            ];
        }



        if ($user->status !== 'active') {

            return [
                'success' => false,

                'message' =>
                'Your account is inactive.',

                'status' => 403,
            ];
        }

        $token = $user
            ->createToken('dashboard-token')
            ->plainTextToken;

        $role = $user
            ->getRoleNames()
            ->first();

        $permissions = $user
            ->getAllPermissions()
            ->pluck('name')
            ->values()
            ->toArray();

        return [

            'success' => true,

            'message' =>
            'Login successful.',

            'token' => $token,

            'user' => [

                'id' => $user->id,

                'name' => $user->name,

                'email' => $user->email,

                'type' => $user->type,

                'status' => $user->status,

                'role' => $role,

                'permissions' => $permissions,

            ],

            'status' => 200,
        ];
    }
}
