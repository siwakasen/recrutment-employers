<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobType extends Model
{
    use HasFactory;

    protected $primaryKey = 'job_type_id';
    protected $fillable = [
        'job_type_name',
    ];
}
