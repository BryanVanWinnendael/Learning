<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index() {
        $items = Task::all();
        return view('welcome', ['tasks' => $items]);
     }
  
     public function save(Request $request) {
        // \Log::info(json_encode(request()->all())); // This is how you can log data to the laravel.log file
  
        $item = new Task;
        $item->name = $request->task;
        $item->save();
  
        $items = Task::all();
        return redirect('/');
     }
  
     public function update(Request $request, $id) {
        $task = Task::find($id);
        
        if ($task) {
           $task->completed = $request->input('completed') == 1;
           $task->save();
  
           return redirect()->back()->with('status', 'Task updated successfully');
        }
  
       // If the task was not found, redirect back with an error message
       return redirect()->back()->withErrors(['message' => 'Task not found']);
     }
}
