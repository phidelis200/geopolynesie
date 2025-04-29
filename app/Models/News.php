<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'category',
        'image',
        'status',
        'readTime',
        'author_id',
        'date', 
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'readTime' => 'integer',
        'date' => 'datetime',
    ];

    /**
     * Get the author that owns the news.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id')->select('id', 'name');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}