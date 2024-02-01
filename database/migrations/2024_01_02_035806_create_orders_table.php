<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('table_id');
            $table->integer('take_away');
            $table->string('total_price');
            $table->string('surcharge');
            $table->string('discount');
            $table->integer('user_id'); //Người tạo đơn
            $table->string('order_status');
            $table->string('note');
            $table->string('modify_time');
            $table->datetime('date_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
