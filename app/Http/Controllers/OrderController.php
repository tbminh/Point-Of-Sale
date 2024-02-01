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
              ->where('order_status','waiting')
              ->orderBy('id', 'desc')
              ->first();
        $data = OrderDetail::join('products as P', 'order_details.product_id', '=', 'P.id')
                        ->select('order_details.*', 'P.product_name')
                        ->where('order_id', $order->id)
                        ->where('product_status','<>',2)
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
    public function check_table($table_id){
        $status = Table::select('table_status')->where('id',$table_id)->first();
        return response()->json($status);
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
                'take_away' => 0,
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
            'note' =>  $request->note != '' ? $request->note : '',
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
        $user_id = $request->input('user_id');
        $dataOrder = $request->input('data_order');
        $orderId = Order::where('table_id', $tableId)->max('id');

        foreach ($dataOrder as $item) {
            $id = $item['id'];
            $productPrice = $item['unit_price'];
            $quantity = $item['quantity'];
            $totalPrice = $item['total_price'];
            $order_detail = OrderDetail::create([
                'order_id' => $orderId,
                'product_id' => $id,
                'unit_price' => $productPrice,
                'quantity' => $quantity,
                'quantity_done' => 0,
                'price' => $totalPrice,
                'product_status' => 0,
                'user_id' => $user_id
            ]);
            Table::where('id',$tableId)->update(['table_status'=>1]);
        }
        $table_name = Table::select('table_name')->where('id',$tableId)->first();
        $data = [
            'table_id' => $tableId,
            'table_name' => $table_name
        ];
        // broadcast(new \App\Events\Order($data));
        //Update total_price of OrderDetail
        $this->updateTotalPrice($orderId);
        return response()->json($data, 200);
    }
    public function update_qty_done(Request $request){
        $get_qty_done = OrderDetail::select('quantity_done')->where('id', $request->detail_id)->first();
        if ($get_qty_done == $request->quantity_done){
            $order_detail = OrderDetail::where('id', $request->detail_id)->update([
                'quantity_done' => $request->quantity_done,
                'product_status'=> 1
            ]);
            return response()->json(['message'=> $order_detail], 200);
        }
        $order_detail = OrderDetail::where('id', $request->detail_id)->update([
            'quantity_done' => $request->quantity_done,
            'product_status'=> 0
        ]);
        return response()->json(['message'=> $order_detail], 200);
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
        // $this->updateTotalPrice($orderId);
        return response()->json(['message'=>'success'],200);
    }
    public function checkout(Request $request){
        Table::where('id',$request->table_id)->update(['table_status' => 0]);
        $orderId = Order::where('table_id',$request->table_id)->max('id');
        Order::where('id',$orderId)->update([
            'user_id' => $request->user_id,
            'order_status' => 'completed',
            'modify_time'=> Carbon::now('Asia/Ho_Chi_Minh')
        ]);
        return response()->json(['message'=>'Thanh toán thành công'],200);
    }
    #region Take Away
    public function get_order_take_away(){
        $order = Order::join('users', 'orders.user_id', '=', 'users.id')
                ->where('orders.order_status', 'waiting')
                ->where('orders.take_away', '<>', 0)
                ->select('orders.*', 'users.user_name')
                ->get();
        return response()->json($order);
    }
    public function get_take_away_detail($order_id){
        $order = Order::where('id', $order_id)
                ->where('order_status','waiting')
              ->select('id', DB::raw('COALESCE(note, "") as note'),'total_price','surcharge','discount')
              ->orderBy('id', 'desc')
              ->first();
        $data = OrderDetail::join('products as P', 'order_details.product_id', '=', 'P.id')
                        ->select('order_details.*', 'P.product_name')
                        ->where('order_id', $order->id)
                        ->where('product_status','<>',2)
                        ->get();
        $response = [
            'data'=>$data,
            'order'=>$order,
        ];
        return response()->json($response);
    }
    public function create_take_away(Request $request){
        $get_take_way = Order::max('take_away') + 1;
        Order::create([
            'table_id' => 0,
            'take_away' => $get_take_way,
            'total_price' => 0,
            'surcharge' => 0,
            'discount' => 0,
            'user_id' => $request->input('user_id'),
            'order_status' => 'waiting',
            'note' => '',
            'modify_time' => Carbon::now('Asia/Ho_Chi_Minh'),
            'date_order' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
        $orderId = Order::select('id')->where('take_away',$get_take_way)->first();
        $dataOrder = $request->input('data_order');
        foreach ($dataOrder as $item) {
            $id = $item['id'];
            $productPrice = $item['unit_price'];
            $quantity = $item['quantity'];
            $totalPrice = $item['total_price'];
            $order_detail = OrderDetail::create([
                'order_id' => $orderId->id,
                'product_id' => $id,
                'unit_price' => $productPrice,
                'quantity' => $quantity,
                'quantity_done' => 0,
                'price' => $totalPrice,
                'product_status' => 0,
                'user_id' => $request->input('user_id')
            ]);
        }
        $this->updateTotalPrice($orderId->id);
        $tableId = Order::where('id', $orderId->id)->get();
        $data = [
            'take_away' => true,
            'table_id' => $tableId,
            'table_name' => 'Khách ngoài'
        ];
        return response()->json($data, 200);
    }
    public function add_meal_take_away(Request $request)
    {
        $user_id = $request->input('user_id');
        $orderId = $request->input('order_id');

        $dataOrder = $request->input('data_order');
        foreach ($dataOrder as $item) {
            $id = $item['id'];
            $productPrice = $item['unit_price'];
            $quantity = $item['quantity'];
            $totalPrice = $item['total_price'];
            $order_detail = OrderDetail::create([
                'order_id' => $orderId,
                'product_id' => $id,
                'unit_price' => $productPrice,
                'quantity' => $quantity,
                'quantity_done' => 0,
                'price' => $totalPrice,
                'product_status' => 0,
                'user_id' => $user_id
            ]);
        }
        //Update total_price of OrderDetail
        $this->updateTotalPrice($orderId);
        $tableId = Order::where('id', $orderId)->get();
        $data = [
            'take_away' => true,
            'table_id' => $tableId,
            'table_name' => 'Khách ngoài'
        ];
        return response()->json($data, 200);
    }
    public function update_take_away(Request $request){
        $order = Order::where('id',$request->order_id)->update([
            'surcharge' => $request->surcharge,
            'discount' => $request->discount,
            'user_id' => $request->user_id,
            'note' =>  $request->note != '' ? $request->note : '',
            'modify_time' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
        $this->updateTotalPrice($request->order_id);
        return response()->json($order,200);
    }
    public function checkout_take_away(Request $request){
        $orderId = Order::where('id',$request->order_id)->first();
        if ($orderId->order_status != "waiting"){
            return response()->json(['message'=>'Hóa đơn đã thanh toán'],400);
        }
        Order::where('id',$orderId->id)->update([
            'user_id' => $request->user_id,
            'order_status' => 'completed',
            'modify_time'=> Carbon::now('Asia/Ho_Chi_Minh')
        ]);
        return response()->json(['message'=>'Thanh toán thành công'],200);
    }
    public function cancel_take_away(Request $request){
        $order = Order::where('id',$request->order_id)->update([
            'order_status'=>'cancel',
            'user_id'=>$request->user_id
        ]);
        return response()->json(['message'=>'Success'],200);
    }
    #endregion
  
}
