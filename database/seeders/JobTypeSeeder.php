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
                'job_type_name' => 'Full-time'
            ],
            [
                'job_type_name' => 'Part-time'
            ],
            [
                'job_type_name' => 'Contract'
            ],
            [
                'job_type_name' => 'Freelance'
            ],
            [
                'job_type_name' => 'Internship'
            ],
            [
                'job_type_name' => 'Temporary'
            ]
        ]);
    }
}
