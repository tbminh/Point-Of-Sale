<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function get_order_detail($table_id)
    {
        $order = Order::where('table_id', $table_id)
              ->select('id', DB::raw('COALESCE(note, "") as note'),'total_price','surcharge','discount')
              ->orderBy('id', 'desc')
              ->first();
        $data = OrderDetail::join('products as P', 'order_details.product_id', '=', 'P.id')
                        ->select('order_details.*', 'P.product_name')
                        ->where('order_id', $order->id)
                        ->get();
        $response = [
            'data'=>$data,
            'order'=>$order,
        ];
        return response()->json($response);
    }
    public function get_table_order()
    {
        $data = Table::get();
        return response()->json($data);
    }
    public function get_product_order(Request $request)
    {
        $searchValue = $request->product_name;
        $query = Product::query();

        if ($searchValue) {
            $query->where('product_name', 'like', '%' . $searchValue . '%');
        }
        $data = $query->get();
        return response()->json($data);
    }
    public function create_order(Request $request)
    {
        $table = Table::where('id', $request->table_id)->first();
        if ($table->table_status == 0) {
            Table::where('id', $request->table_id)->update([
                'table_status' => 1,
            ]);
            Order::create([
                'table_id' => $request->table_id,
                'total_price' => 0,
                'surcharge' => 0,
                'discount' => 0,
                'user_id' => $request->user_id,
                'order_status' => 'waiting',
                'note' => '',
                'modify_time' => Carbon::now('Asia/Ho_Chi_Minh'),
                'date_order' => Carbon::now('Asia/Ho_Chi_Minh'),
            ]);
        }
        return response()->json(['message'=>'Thêm thành công'],200);
    }
    public function update_order(Request $request){
        $orderId = Order::where('table_id', $request->table_id)->max('id');
        $order = Order::where('id',$orderId)->update([
            'surcharge' => $request->surcharge,
            'discount' => $request->discount,
            'user_id' => $request->user_id,
            'note' => $request->note,
            'modify_time' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
        $this->updateTotalPrice($orderId);
        return response()->json($order,200);
    }
    private function updateTotalPrice($orderId){
        $order = Order::where('id', $orderId)->first();
        $total_price = OrderDetail::where('order_id', $orderId)->sum('price') + $order->surcharge - $order->discount;

        $order->update([
            'total_price' => $total_price,
        ]);
    }
    public function add_meal(Request $request)
    {
        $tableId = $request->input('table_id');
        $note = $request->input('note');
        $user_id = $request->input('user_id');
        $dataOrder = $request->input('data_order');
        $orderId = Order::where('table_id', $tableId)->max('id');

        foreach ($dataOrder as $item) {
            $id = $item['id'];
            $productPrice = $item['unit_price'];
            $quantity = $item['quantity'];
            $totalPrice = $item['total_price'];

            //Check exists order detail
            $detail = OrderDetail::where('product_id', $id)
                    ->where('order_id', $orderId)
                    ->first();
            if ($detail == null) {
                $order_detail = OrderDetail::create([
                    'order_id' => $orderId,
                    'product_id' => $id,
                    'unit_price' => $productPrice,
                    'quantity' => $quantity,
                    'price' => $totalPrice,
                    'product_status' => 0,
                    'user_id' => $user_id
                ]);
                Table::where('id',$tableId)->update(['table_status'=>1]);
            } 
            else {
                $get_detail = OrderDetail::where('id', $detail->id)->first();
                $order_detail = OrderDetail::where('id', $detail->id)->update([
                    'unit_price' => $productPrice,
                    'quantity' => $get_detail->quantity + $quantity,
                    'price' => $get_detail->price +  $totalPrice,
                    'product_status' => 0,
                    'user_id' => $user_id,
                ]);
            }
        }
        //Update total_price of OrderDetail
        $this->updateTotalPrice($orderId);
        return response()->json($order_detail, 200);
    }
    public function update_meal(Request $request)
    {
        $order_detail = OrderDetail::where('id', $request->detail_id)->update([
            'unit_price' => $request->unit_price,
            'quantity' => $request->quantity,
            'price' => $request->unit_price * $request->quantity,
            'product_status' => $request->product_status,
            'user_id' => $request->user_id,
        ]);
        $orderID = OrderDetail::select('order_id')->where('id', $request->detail_id);
        $this->updateTotalPrice($orderID);
        return response()->json(['message'=> $order_detail], 200);
    }
    public function delete_meal(Request $request)
    {
        $orderID = OrderDetail::select('order_id')->where('id', $request->id);
        OrderDetail::where('id', $request->id)->update([
            'product_status'=> 2
        ]);
        $this->updateTotalPrice($orderID);
        return response()->json(['message' => 'Xóa thành công'], 200);
    }
    public function delete_table_order(Request $request)
    {
        $orderId = Order::where('table_id', $request->table_id)->max('id');
        Order::where('id',$orderId)->update([
            'user_id' => $request->user_id,
            'order_status' => 'cancel',
        ]);
        Table::where('id',$request->table_id)->update([
            'table_status' => 0
        ]);
        $this->updateTotalPrice($orderId);
        return response()->json(['message'=>'success'],200);
    }
    public function checkout(Request $request){
        Table::where('id',$request->table_id)->update(['table_status' => 0]);
        $orderId = Order::where('table_id', $request->table_id)->max('id');
        Order::where('id',$orderId)->update([
            'user_id' => $request->user_id,
            'order_status' => 'completed',
            'modify_time'=> Carbon::now('Asia/Ho_Chi_Minh')
        ]);
        return response()->json(['message'=>'Thanh toán thành công'],200);
    }

    public function notify(Request $request)
    {
        $message = $request->input('message');
        $data = ['message' => $message];
        broadcast(new \App\Events\Order($data));
        return $request->message;
    }    
}
