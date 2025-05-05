<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    
    protected $attributes = [
        'status' => 'PENDING'
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'answer',
        'answer_message',
        'answered_at',
        'status'
    ];

    // Add route key binding if needed
    public function getRouteKeyName()
    {
        return 'id';
    }
}
