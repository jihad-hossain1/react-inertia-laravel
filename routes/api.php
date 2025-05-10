<?php

use App\Http\Controllers\TaskSeedController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskSeedController::class);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
