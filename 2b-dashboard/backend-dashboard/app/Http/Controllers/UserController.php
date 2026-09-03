<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}

    public function index()
    {
        $users = $this->userService->index();

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $result = $this->userService->create(
            $request->all()
        );

        return response()->json([
            'success' => $result['success'],
            'message' => $result['message'],
            'data' => $result['data'] ?? null,
        ], $result['status']);
    }

    public function show(User $user)
    {
        $data = $this->userService->show($user);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function update(
        Request $request,
        User $user
    ) {
        $result = $this->userService->update(
            $user,
            $request->all()
        );

        return response()->json([
            'success' => $result['success'],
            'message' => $result['message'],
            'data' => $result['data'],
        ], $result['status']);
    }

    public function destroy(User $user)
    {
        $this->userService->delete($user);

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
        ]);
    }
}