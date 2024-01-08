<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class OrderController extends Controller
{
    public function get_order_detail($id){
        $data = OrderDetail::where('order_id',$id)->get();
        return response()->json($data);
    }
    public function get_table_order(Request $request)
    {
        $data = Table::get();
        return response()->json($data);
    }
    public function add_meal(Request $request)
    {
        
    }
    public function update_meal($id, Request $request)
    {
    }
    public function delete_meal($id)
    {
        
    }
}
