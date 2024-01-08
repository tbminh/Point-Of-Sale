<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    #region User
    public function get_user()
    {
        $product = User::orderBy('id', 'DESC')->get();
        return response()->json(['list' => $product]);
    }
    public function get_user_detail($id){
        $data = User::where('id',$id)->get();
        return response()->json($data);
    }
    public function add_user(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|unique:users,user_name',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::create([
            'role' => $request->role,
            'full_name' => $request->full_name,
            'user_name' => $request->user_name,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);
        return response()->json(['message' => 'Thêm thành công'], 201);
    }
    public function update_user($id, Request $request)
    {
        User::where('id', $id)->update([
            'role' => $request->role,
            'full_name' => $request->full_name,
            'user_name' => $request->user_name,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);
        return response()->json(['message' => 'Success'], 200);
    }
    public function delete_user($id)
    {
        User::where('id', $id)->delete();
        return response()->json(['message' => 'Success'], 200);
    }
    #endregion
    #region Product
    public function get_product(Request $request){
        $perPage = 5; // Số lượng dòng mỗi trang    
        $searchValue = $request->product_name;
        $pageNumber = $request->page; 
        $query = Product::query();

        if ($searchValue) {
            $query->where('product_name', 'like', '%' . $searchValue . '%');
        }
        $query->orderBy('id', 'desc');
        $data = $query->paginate($perPage, ['*'], 'page', $pageNumber)->map(function ($item) {
            return [
                'id' => $item->id,
                'product_name' => $item->product_name,
                'product_price' => $item->product_price,
            ];
        });
        $totalItems = $query->paginate($perPage, ['*'], 'page', $pageNumber)->total();
        $totalPages =$totalItems;

        // Thêm thông tin về tổng số trang vào dữ liệu trả về
        $data->put('total_pages', $totalPages);
        return response()->json($data);
    }

    public function get_product_detail($id){
        $data = Product::where('id',$id)->get();
        return response()->json($data);
    }

    public function add_product(Request $request){
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|unique:products,product_name',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $product = Product::create([
            'product_name' => $request->product_name,
            'product_price' => $request->product_price,
        ]);
        return response()->json(['message' => 'Thêm thành công'], 201);
    }
    public function update_product($id, Request $request){
        $product = Product::where('id', $id)->update([
            'product_name' => $request->product_name,
            'product_price' => $request->product_price,
        ]);
        if ($product === 0){
            return response()->json(['message' => 'Fail'], 404);
        }
        return response()->json(['message' => 'Success'], 200);
    }
    public function delete_product($id){
        Product::where('id', $id)->delete();
        return response()->json(['message' => 'Success'], 200);
    }
    #endregion
    #region Table
    public function get_table_detail($id){
        $data = Table::where('id',$id)->get();
        return response()->json($data);
    }
    public function get_table(Request $request)
    {
        $perPage = 5; // Số lượng dòng mỗi trang    
        $searchValue = $request->table_name;
        $pageNumber = $request->page; 
        $query = Table::query();

        if ($searchValue) {
            $query->where('table_name', 'like', '%' . $searchValue . '%');
        }
        $query->orderBy('id', 'desc');
        $data = $query->paginate($perPage, ['*'], 'page', $pageNumber)->map(function ($item) {
            return [
                'id' => $item->id,
                'table_name' => $item->table_name,
            ];
        });
        $totalItems = $query->paginate($perPage, ['*'], 'page', $pageNumber)->total();
        $totalPages = $totalItems;

        // Thêm thông tin về tổng số trang vào dữ liệu trả về
        $data->put('total_pages', $totalPages);
        return response()->json($data);
    }
    public function add_table(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'table_name' => 'required|string|unique:tables,table_name',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $table = Table::create([
            'table_name' => $request->table_name,
            'table_status' => 0,
        ]);
        return response()->json(['message' => 'Thêm thành công'], 201);
    }
    public function update_table($id, Request $request)
    {
        Table::where('id', $id)->update([
            'table_name' => $request->table_name,
        ]);
        return response()->json(['message' => 'Success'], 200);
    }
    public function delete_table($id)
    {
        Table::where('id', $id)->delete();
        return response()->json(['message' => 'Success'], 200);
    }
    #endregion
}
