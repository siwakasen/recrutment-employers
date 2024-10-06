<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_types')->insert([
            [
                'job_type_id' => 1,
                'job_type_name' => 'Full-time On-Site'
            ],
            [
                'job_type_id' => 2,
                'job_type_name' => 'Full-time Hybrid'
            ],
            [
                'job_type_id' => 3,
                'job_type_name' => 'Full-time Remote'
            ],
            [
                'job_type_id' => 4,
                'job_type_name' => 'Internship On-Site'
            ],
            [
                'job_type_id' => 5,
                'job_type_name' => 'Internship Hybrid'
            ],
            [
                'job_type_id' => 6,
                'job_type_name' => 'Internship Remote'
            ],

        ]);
    }
}
