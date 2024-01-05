<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    #region Product
    public function get_product(){
        $product = Product::all();
        return response()->json(['list'=> $product]);
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
    public function update_product($id,Request $request){
        Product::where('id',$id)->update([
            'product_name' => $request->product_name,
            'product_price' => $request->product_price,
        ]);
        return response()->json(['message'=>'Success'],200);
    }
    public function delete_product($id){
        Product::where('id',$id)->delete();
        return response()->json(['message'=>'Success'],200);
    }
    #endregion
}
