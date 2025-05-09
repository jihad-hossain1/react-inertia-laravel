<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;


class TaskController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::latest()->paginate(10);
        $task_count_by_status = Task::select('status')->selectRaw('count(*) as total')->groupBy('status')->get();
        
        return inertia('tasks/Tasks', [
            'tasks' => $tasks,
            'taskByStatus' => $task_count_by_status
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return inertia('tasks/new/New');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validateRequest = $request->validate([
            'title' => 'required',
            'description' => 'required|min:3|max:30000',
            'priority' => 'required',
            'due_date' => 'required',
        ]);

        Task::create($validateRequest);

        return redirect()->route('tasks.create')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('tasks/[id]/Task', ['task' => $task]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('tasks/[up]/Update', ['task' => $task]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validateRequest = $request->validate([
            'description' => 'required|min:3|max:30000',
        ]);

        $validated['description'] = strip_tags($validateRequest['description']);

        $task->update($validated);
        return redirect()->route('tasks.index')->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully');
    }
}
