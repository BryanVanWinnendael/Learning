<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/', [TaskController::class, 'index']);
Route::post('/task-create', [TaskController::class, 'save'])->name('task.save');
Route::post('/task-update/{id}', [TaskController::class, 'update'])->name('task.update');
