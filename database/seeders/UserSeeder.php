<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 0; $i < 5; $i++){
            DB::table('users')->insert([
                'role' => 'admin',
                'full_name' => $faker->name,
                'user_name' => $faker->userName,
                'password' => Hash::make('12345678'), // Mật khẩu mặc định cho tất cả người dùng
                'phone' => $faker->phoneNumber,
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
