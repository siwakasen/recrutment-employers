<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $primaryKey = 'notification_id';
    protected $fillable = [
        'application_id',
        'applicant_id',
        'current_status',
        'message',
        'date_notification',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id');
    }

    public function applicant()
    {
        return $this->belongsTo(Applicant::class, 'applicant_id');
    }
}
