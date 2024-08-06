import { Utilisateur } from './utilisateur'; // Import de l'interface Utilisateur depuis le fichier utilisateur.ts

describe('Utilisateur', () => { // Utilisateur avec une majuscule car c'est une classe ES6
  it('should create an instance', () => {
    const utilisateur: Utilisateur = {}; // Création d'une instance de l'interface Utilisateur
    expect(utilisateur).toBeTruthy(); // Vérification que l'instance a été créée avec succès
  });
});