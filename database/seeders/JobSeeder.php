<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jobs')->insert([
            [
                'job_type_id' => 1,
                'job_name' => 'Software Engineer',
                'min_rate_salary' => 1000000,
                'max_rate_salary' => 2000000,
                'min_experience' => 2,
                'job_desc' => 'Software Engineer',
                'job_place' => 'Jakarta',
                'requirement' => json_encode([
                    'Bachelor Degree in Computer Science or related field',
                    '2 years of experience in software development',
                    'Experience with Java, Spring Boot, and MySQL',
                    'Experience with Git and CI/CD',
                    'Experience with Agile methodology',
                    'Good communication skills',
                    'Good problem-solving skills',
                    'Good teamwork skills',
                ]),
                'responsibilities' => json_encode([
                    'Develop software applications',
                    'Write clean and maintainable code',
                    'Perform code review',
                    'Perform unit testing',
                    'Perform integration testing',
                ]),
                'date_listed' => now(),
                'date_expired' => now()->addMonth(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'job_type_id' => 2,
                'job_name' => 'Data Scientist',
                'min_rate_salary' => 1500000,
                'max_rate_salary' => 2500000,
                'min_experience' => 3,
                'job_desc' => 'Data Scientist',
                'job_place' => 'Jakarta',
                'requirement' => json_encode([
                    'Bachelor Degree in Computer Science, Statistics, Mathematics, or related field',
                    '3 years of experience in data science',
                    'Experience with Python, Pandas, NumPy, and Scikit-Learn',
                    'Experience with Git and CI/CD',
                    'Experience with Agile methodology',
                    'Good communication skills',
                    'Good problem-solving skills',
                    'Good teamwork skills',
                ]),
                'responsibilities' => json_encode([
                    'Analyze data',
                    'Build machine learning models',
                    'Perform data visualization',
                    'Perform data cleaning',
                    'Perform data transformation',
                ]),
                'date_listed' => now(),
                'date_expired' => now()->addMonth(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
