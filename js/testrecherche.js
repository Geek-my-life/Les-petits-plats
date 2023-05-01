/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
function rechercheRecettes(recettes) {
  // Récupérer la valeur de l'input de recherche et la formater en minuscules
  const rechercheInput = document
    .querySelector(".rechercheInput")
    .value.trim()
    .toLowerCase();

  // Initialiser un tableau pour stocker les recettes filtrées
  const recettesFiltrees = [];

  // Parcourir les recettes
  for (let i = 0; i < recettes.length; i += 1) {
    const recette = recettes[i];
    let match = false;

    // Vérifier si la recette correspond à la recherche
    for (let j = 0; j < [recette.name, recette.description].length; j += 1) {
      const texte = [recette.name, recette.description][j].toLowerCase();
      if (texte.includes(rechercheInput)) {
        match = true;
        break;
      }
    }

  
    if (!match) {
      for (let j = 0; j < recette.ingredients.length; j += 1) {
        const ingredient = recette.ingredients[j].ingredient.toLowerCase();
        if (ingredient.includes(rechercheInput)) {
          match = true;
          break;
        }
      }
    }

    // Ajouter la recette au tableau des recettes filtrées si elle correspond à la recherche
    if (match) {
      recettesFiltrees.push(recette);
    }
  }

  // Si aucune recette n'a été trouvée, affiche un message d'erreur dans la boîte des recettes
  if (recettesFiltrees === 0) {
    document.querySelector(".boxRecettes").innerHTML = `
      <div class="messageErreurRecette"> 
      Aucune recette ne correspond à votre critère… <br> vous pouvez chercher « tarte aux pommes », « poisson », etc. </div>`;
    document.querySelector(".boxRecettes").style.justifyContent = "center";
  } else {
    // Sinon, affiche les recettes filtrées
    document.querySelector(".boxRecettes").style.justifyContent = "space-between";

    // Crée des tableaux d'ingrédients, d'appareils et d'ustensiles pour les filtres
    const ingredients = recettesFiltrees.reduce(
      (resultats, recette) => [...resultats, ...recette.ingredients],
      [],
    );
    const appareils = recettesFiltrees.reduce(
      (resultats, recette) => [...resultats, recette.appliance],
      [],
    );
    const ustensiles = recettesFiltrees.reduce(
      (resultats, recette) => [...resultats, ...recette.ustensils],
      [],
    );

    // Appelle la fonction "recettesData" pour afficher les recettes filtrées
    recettesData(recettesFiltrees);
    // Appelle la fonction "rechercheFiltres" pour afficher les ingrédients, appareils et ustensiles
    rechercheFiltres("ingredients", ingredients, (ingredient) => createTag(ingredient, "tagIngredient", "#3282f7", recettes, rechercheTags));
    rechercheFiltres("appareils", appareils, (appareil) => createTag(appareil, "tagAppareil", "#68d9a4", recettes, rechercheTags));
    rechercheFiltres("ustensiles", ustensiles, (ustensil) => createTag(ustensil, "tagUstensile", "#ed6454", recettes, rechercheTags));
  }
}
