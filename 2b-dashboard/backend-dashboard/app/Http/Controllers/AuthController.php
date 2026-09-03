<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
    ) {}

    public function register(Request $request)
    {
        $user = $this->authService->register(
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $result = $this->authService->login(
            $request->email,
            $request->password
        );

        return response()->json([
            'success' => $result['success'],
            'message' => $result['message'],
            'token' => $result['token'] ?? null,
            'user' => $result['user'] ?? null,
        ], $result['status']);
    }
}