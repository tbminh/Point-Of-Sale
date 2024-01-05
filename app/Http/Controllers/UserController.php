<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('user_name', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|unique:users,user_name',
            'full_name' => 'required|string',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::create([
            'role'=> $request->role,
            'user_name' => $request->user_name,
            'full_name' => $request->full_name,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);
        return response()->json(['message' => 'Đăng ký thành công'], 201);
    }
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }
}
