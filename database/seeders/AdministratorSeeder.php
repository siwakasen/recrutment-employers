<?php

namespace Database\Seeders;

use App\Models\Administrator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdministratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('administrators')->insert([
        //     [
        //         'role_id' => 1,
        //         'admin_name' => 'Logobreaker',
        //         'email' => 'logobreaker@gmail.com',
        //         'password' => bcrypt('password')
        //     ],
        //     [
        //         'role_id' => 2,
        //         'admin_name' => 'John Doe',
        //         'email' => 'maderiksi20@gmail.com',
        //         'password' => bcrypt('password'),
        //     ]
        // ]);

        Administrator::factory()->count(25)->create();
    }
}
