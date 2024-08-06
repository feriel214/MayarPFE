<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fournisseur;

class FournisseurController extends Controller
{
    // Get all fournisseurs
    public function index()
    {
        $fournisseurs = Fournisseur::all();
        return response()->json($fournisseurs);
    }

    // Create a new fournisseur
    public function store(Request $request)
    {
        $request->validate([
            'codeFourn' => 'required|string|max:255|unique:fournisseurs',
            'nomFournisseur' => 'required|string|max:255',
        ]);

        $fournisseur = Fournisseur::create($request->all());
        return response()->json($fournisseur, 201);
    }

    // Get a fournisseur by ID
    public function show($id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        return response()->json($fournisseur);
    }

    // Update a fournisseur
public function update(Request $request, $id)
{
    $request->validate([
        'codeFourn' => 'sometimes|required|string|max:255|unique:fournisseurs,codeFourn,'.$id.',idFourn',
        'nomFournisseur' => 'sometimes|required|string|max:255',
    ]);

    $fournisseur = Fournisseur::findOrFail($id);
    $fournisseur->update($request->all());
    return response()->json($fournisseur);
}


    // Delete a fournisseur by ID
    public function destroy($id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->delete();
        return response()->json(null, 204);
    }
}
