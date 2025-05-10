<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;


class TaskSeedController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return '[index]';
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateRequest = $request->validate([
            'value' => 'required',
        ]);

        $value = $validateRequest['value'];

        if(!is_numeric($value)){
            return '[error numeric required]';
        }

        if($value <= 0){
            return '[error positive number required]';
        }

        if($value > 10000){
            return '[error max 10000]';
        }

        Task::factory($value)->create();
        
        return '[stored]';
       //
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
    public function update(Request $request, Task $task)
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
