<?php

namespace App\Http\Controllers;

use App\Models\BloodPressure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class BloodPressureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('BloodPressures/Index', [
            'bloodPressures' => BloodPressure::where('user_id', '=', $request->user()->id)->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date_blood_pressure' => 'required|date',
            'systemic_blood_pressure' => 'required|integer',
            'diastolic_blood_pressure' => 'required|integer'
        ]);

        $request->user()->BloodPressure()->create($validated);

        return redirect(route('bloodPressures.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(BloodPressure $bloodPressure)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BloodPressure $bloodPressure)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BloodPressure $bloodPressure): RedirectResponse
    {
        $validated = $request->validate([
            'date_blood_pressure' => 'required|date',
            'systemic_blood_pressure' => 'required|integer',
            'diastolic_blood_pressure' => 'required|integer'
        ]);

        $bloodPressure->update($validated);

        return redirect(route('bloodPressures.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BloodPressure $bloodPressure): RedirectResponse
    {
        $bloodPressure->delete();

        return redirect(route('bloodPressures.index'));
    }
}
