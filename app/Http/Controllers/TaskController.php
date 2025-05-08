<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class TaskController extends Controller
{
    public function authorize()
    {
        return true;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'priority' => ['required'],
            'due_date' => ['required', 'date']
        ]);

        
       
        Task::create($validData);
        return response()->json(['mess' => 'Task created successfully']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'priority' => ['required'],
            'due_date' => ['required', 'date'],
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
    
        try {
            $validData = $validator->validated();
            Task::create($validData);
    
            return response()->json(['success' => 'Task created successfully'], 201);
        } catch (QueryException $e) {
            // You can also log the error: Log::error($e);
            // return response()->json([
            //     'message' => 'Database error',
            //     // 'error' => $e->getMessage()  // Or omit this in production
            // ], 500);

            return response()->json([
                'message' => 'An error occurred while saving the task.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
