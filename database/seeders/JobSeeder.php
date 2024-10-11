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
            [
                'job_type_id' => 3,
                'job_name' => 'DevOps Engineer',
                'min_rate_salary' => 1500000,
                'max_rate_salary' => 2500000,
                'min_experience' => 3,
                'job_desc' => 'DevOps Engineer',
                'job_place' => 'Jakarta',
                'requirement' => json_encode([
                    'Bachelor Degree in Computer Science or related field',
                    '3 years of experience in DevOps',
                    'Experience with Linux, Docker, and Kubernetes',
                    'Experience with Git and CI/CD',
                    'Experience with Agile methodology',
                    'Good communication skills',
                    'Good problem-solving skills',
                    'Good teamwork skills',
                ]),
                'responsibilities' => json_encode([
                    'Build CI/CD pipelines',
                    'Deploy applications',
                    'Monitor applications',
                    'Troubleshoot applications',
                    'Automate tasks',
                ]),
                'date_listed' => now(),
                'date_expired' => now()->addMonth(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'job_type_id' => 4,
                'job_name' => 'Product Manager',
                'min_rate_salary' => 1500000,
                'max_rate_salary' => 2500000,
                'min_experience' => 3,
                'job_desc' => 'Product Manager',
                'job_place' => 'Jakarta',
                'requirement' => json_encode([
                    'Bachelor Degree in Computer Science, Business, or related field',
                    '3 years of experience in product management',
                    'Experience with Agile methodology',
                    'Good communication skills',
                    'Good problem-solving skills',
                    'Good teamwork skills',
                ]),
                'responsibilities' => json_encode([
                    'Define product vision',
                    'Create product roadmap',
                    'Write user stories',
                    'Prioritize features',
                    'Work with cross-functional teams',
                ]),
                'date_listed' => now(),
                'date_expired' => now()->addMonth(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'job_type_id' => 5,
                'job_name' => 'UI/UX Designer',
                'min_rate_salary' => 1000000,
                'max_rate_salary' => 2000000,
                'min_experience' => 2,
                'job_desc' => 'UI/UX Designer',
                'job_place' => 'Jakarta',
                'requirement' => json_encode([
                    'Bachelor Degree in Design, Computer Science, or related field',
                    '2 years of experience in UI/UX design',
                ]),
                'responsibilities' => json_encode([
                    'Create wireframes',
                    'Create mockups',
                    'Create prototypes',
                    'Conduct user research',
                    'Conduct usability testing',
                ]),
                'date_listed' => now(),
                'date_expired' => now()->addMonth(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
