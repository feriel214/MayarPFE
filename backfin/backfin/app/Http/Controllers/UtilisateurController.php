<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Importez la classe Auth

class UtilisateurController extends Controller
{

    public function inscription(Request $request)
{
    // Validation des données de la requête
    $validatedData = $request->validate([
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'email' => 'required|email|unique:utilisateurs',
        'password' => 'required|string',
        // Remove profil from validation rules since we will set it by default
    ]);

    // Création d'un nouvel utilisateur
    $utilisateur = Utilisateur::create([
        'nom' => $validatedData['nom'],
        'prenom' => $validatedData['prenom'],
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']),
        'profil' => 'user', // Ajout du rôle par défaut
    ]);

    // Réponse JSON pour confirmer la création de l'utilisateur
    return response()->json(['message' => 'Utilisateur ajouté avec succès'], 201);
}

public function connexion(Request $request)
{
    // Récupérer les données de la requête
    $credentials = $request->only('email', 'password');

    // Vérifier si l'utilisateur existe avec les identifiants fournis
    $utilisateur = Utilisateur::where('email', $credentials['email'])->first();

    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if ($utilisateur && password_verify($credentials['password'], $utilisateur->password)) {
        // Si les identifiants sont corrects, retournez une réponse JSON avec un message de succès
        return response()->json([
            'message' => 'Connexion réussie',
            'connex' => true, // Variable pour indiquer la connexion réussie
            'utilisateur' => $utilisateur // Retourner toutes les données de l'utilisateur
        ], 200);
    } else {
        // Si les identifiants sont incorrects, retournez une réponse JSON avec un message d'erreur
        return response()->json([
            'message' => 'Identifiants incorrects',
            'connex' => false // Variable pour indiquer la connexion échouée
            
        ], 401);
    }
}

//     public function connexion(Request $request)
// {
//     // Récupérer les données de la requête
//     $credentials = $request->only('email', 'password');

//     // Vérifier si l'utilisateur existe avec les identifiants fournis
//     $utilisateur = Utilisateur::where('email', $credentials['email'])->first();

//     // Vérifier si l'utilisateur existe et si le mot de passe correspond
//     if ($utilisateur && password_verify($credentials['password'], $utilisateur->password)) {
//         // Si les identifiants sont corrects, retournez une réponse JSON avec un message de succès
//         return response()->json([
//             'message' => 'Connexion réussie',
//             'connex' => true, // Variable pour indiquer la connexion réussie
//             'profil' => $utilisateur->profil // Retourner le profil de l'utilisateur
//         ], 200);
//     } else {
//         // Si les identifiants sont incorrects, retournez une réponse JSON avec un message d'erreur
//         return response()->json([
//             'message' => 'Identifiants incorrects',
//             'connex' => false // Variable pour indiquer la connexion échouée
//         ], 401);
//     }
// }


    public function addAccount(Request $request)
    {
    // Validation des données de la requête
    $validatedData = $request->validate([
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'email' => 'required|email|unique:utilisateurs',
        'password' => 'required|string',
        'profil' => 'required|in:ingénieur,directeur,manager,financier',
        'ImageUserPath' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validation pour l'image
    ]);

    // Vérification si une image a été téléchargée
    if ($request->hasFile('ImageUserPath')) {
        // Récupérer le fichier image téléchargé
        $image = $request->file('ImageUserPath');

        // Nom du fichier avec un timestamp pour éviter les doublons
        $fileName = time() . '_' . $image->getClientOriginalName();

        // Stocker l'image dans le dossier "uploads" du stockage Laravel
        $image->storeAs('uploads', $fileName);

        // Création d'un nouvel utilisateur avec l'image
        $utilisateur = Utilisateur::create([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'profil' => $validatedData['profil'],
            'ImageUserPath' => $fileName, // Stocker le nom du fichier dans la base de données
        ]);
    } else {
        // Création d'un nouvel utilisateur sans image
        $utilisateur = Utilisateur::create([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'profil' => $validatedData['profil'],
        ]);
    }

    // Réponse JSON pour confirmer la création de l'utilisateur
    return response()->json(['message' => 'Utilisateur ajouté avec succès'], 201);
    }


public function getImage($id)
{
    try {
        // Trouver l'utilisateur par son identifiant
        $utilisateur = Utilisateur::findOrFail($id);

        // Vérifier si l'utilisateur a une image
        if ($utilisateur->ImageUserPath) {
            // Retourner l'URL de l'image
            return response()->json(['image_url' => Storage::url($utilisateur->ImageUserPath)], 200);
        } else {
            // Si l'utilisateur n'a pas d'image, retourner un message approprié
            return response()->json(['message' => 'L\'utilisateur n\'a pas d\'image associée'], 404);
        }
    } catch (\Exception $e) {
        // Gestion des erreurs
        return response()->json(['message' => 'Erreur lors de la récupération de l\'image de l\'utilisateur', 'error' => $e->getMessage()], 500);
    }
}

public function edition(Request $request, $id)
{
    try {
        // Find the user by ID
        $utilisateur = Utilisateur::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'nom' => 'sometimes|string',
            'prenom' => 'sometimes|string',
            'email' => 'sometimes|email|unique:utilisateurs,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'profil' => 'sometimes|in:ingénieur,directeur,manager,user,financier',
            'ImageUserPath' => 'sometimes|string',
        ]);

        // Update only the provided fields
        if (isset($validatedData['nom'])) {
            $utilisateur->nom = $validatedData['nom'];
        }
        if (isset($validatedData['prenom'])) {
            $utilisateur->prenom = $validatedData['prenom'];
        }
        if (isset($validatedData['email'])) {
            $utilisateur->email = $validatedData['email'];
        }
        if (isset($validatedData['profil'])) {
            $utilisateur->profil = $validatedData['profil'];
        }
        if (isset($validatedData['password'])) {
            $utilisateur->password = bcrypt($validatedData['password']);
        }
        if (isset($validatedData['ImageUserPath'])) {
            $utilisateur->ImageUserPath = $validatedData['ImageUserPath'];
        }

        // Save the user's updated data
        $utilisateur->save();

        // Return a JSON response confirming the update
        return response()->json(['message' => 'Utilisateur mis à jour avec succès'], 200);
    } catch (\Exception $e) {
        // Handle any errors
        return response()->json(['message' => 'Erreur lors de la mise à jour de l\'utilisateur', 'error' => $e->getMessage()], 500);
    }
}






public function getAllUsers(Request $request)
{
    try {
        // Récupérer tous les utilisateurs
        $utilisateurs = Utilisateur::all();

        // Retourner les utilisateurs en réponse JSON
        return response()->json([
            'success' => true,
            'data' => $utilisateurs
        ], 200);
    } catch (\Exception $e) {
        // Gestion des erreurs
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la récupération des utilisateurs',
            'error' => $e->getMessage()
        ], 500);
    }
}














}
