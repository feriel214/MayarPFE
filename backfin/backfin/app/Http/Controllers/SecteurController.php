<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Secteur;

class SecteurController extends Controller
{
    // Get all secteurs
    public function index()
    {
        $secteurs = Secteur::all();
        return response()->json($secteurs);
    }

    // Create a new secteur
    public function store(Request $request)
    {
        $request->validate([
            'codeSec' => 'required|string|max:255',
            'libelleSec' => 'required|string|max:255',
            'delegation_id' => 'required|integer|exists:delegation,idDel',
        ]);

        $secteur = Secteur::create($request->all());
        return response()->json($secteur, 201);
    }

    // Get a secteur by ID
    public function show($id)
    {
        $secteur = Secteur::findOrFail($id);
        return response()->json($secteur);
    }

    // Update a secteur
    public function update(Request $request, $id)
    {
        $request->validate([
            'codeSec' => 'sometimes|required|string|max:255',
            'libelleSec' => 'sometimes|required|string|max:255',
            'delegation_id' => 'sometimes|required|integer|exists:delegation,idDel',
        ]);

        $secteur = Secteur::findOrFail($id);
        $secteur->update($request->all());
        return response()->json($secteur);
    }

    // Delete a secteur by ID
    public function destroy($id)
    {
        $secteur = Secteur::findOrFail($id);
        $secteur->delete();
        return response()->json(null, 204);
    }
}
