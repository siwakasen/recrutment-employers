<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $primaryKey = 'job_id';
    protected $fillable = [
        'job_type_id',
        'job_name',
        'min_rate_salary',
        'max_rate_salary',
        'min_experience',
        'job_desc',
        'job_place',
        'requirement',
        'responsibilities',
        'date_listed',
        'date_expired',
    ];

    public function jobType()
    {
        return $this->belongsTo(JobType::class, 'job_type_id');
    }
}
