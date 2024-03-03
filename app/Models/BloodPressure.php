<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BloodPressure extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_blood_pressure',
        'systemic_blood_pressure',
        'diastolic_blood_pressure'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
