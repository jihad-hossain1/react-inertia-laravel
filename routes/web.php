<?php

use App\Http\Controllers\PostController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// pass data
Route::get('/', function () {
    return Inertia::render('Home', ['name' => 'Tody']);
});

// Route::inertia('/about',"About");

// Route::inertia('/',"Home");

// Route::get('/', function () {
//     return Inertia::render('Home');
// });

Route::get('/tasks', function (Request $request) {
    $limit = $request->input('limit', 10);
    $offset = $request->input('offset', 0);
    
    $total = Post::count();
    $totalPages = ceil($total / $limit);
    $currentPage = floor($offset / $limit) + 1;
    
    $posts = Post::limit($limit)->offset($offset)->get();
    
    return Inertia::render('tasks/Tasks', [
        'tasks' => $posts,
        'total' => $total,
        'totalPages' => $totalPages,
        'currentPage' => $currentPage
    ]);
});

Route::get('/tasks/new', function () {
    return inertia('tasks/new/New');
});

Route::get('/tasks/{id}', function () {
    return inertia('tasks/[id]/Task');
});


// Route::get('/', function () {
//     return inertia('Home');
// });
