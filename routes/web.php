<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\News\NewsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Contact\ContactController;

Route::get('/', [NewsController::class, 'getNewHomePage'])->name('home');

Route::get('services', function () {
    return Inertia::render('services');
})->name('services');

Route::get('presentation', function () {
    return Inertia::render('presentation');
})->name('presentation');

Route::get('news', [NewsController::class, 'getAllNews'])->name('news');

Route::get('news/{slug}', [NewsController::class, 'getNewsDetail'])->name('new-detail');

Route::get('contact-us', function () {
    return Inertia::render('contact-us');
})->name('contact-us');

Route::get('about-us', function () {
    return Inertia::render('about-us');
})->name('about-us');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
    
    Route::get('admin/news', [NewsController::class, 'getAdminNews'])
        ->name('admin-news');
    
    Route::get('admin/contacts', function () {
        return Inertia::render('admin/contacts');
    })->name('contacts');
    
    Route::get('admin/dashboard-stats', [DashboardController::class, 'getStats'])
        ->name('dashboard.stats');
    
    Route::post('admin/news', [NewsController::class, 'store'])->name('admin.news.store');
    Route::put('admin/news/{slug}', [NewsController::class, 'update'])->name('admin.news.update');
    Route::delete('admin/news/{slug}', [NewsController::class, 'destroy'])->name('admin.news.destroy');
    
    Route::get('/admin/contacts', [ContactController::class, 'index'])->name('admin.contacts');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/api.php';