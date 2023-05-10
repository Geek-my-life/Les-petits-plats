function filtrerRecettes(recettes, rechercheInputTexte) {
  const recettesFiltrees = [];

  // Parcourir les recettes
  for (let i = 0; i < recettes.length; i += 1) {
    const recette = recettes[i];
    let match = false;

    // Vérifier si la recette correspond à la recherche
    for (let j = 0; j < [recette.name, recette.description].length; j += 1) {
      const texte = [recette.name, recette.description][j].toLowerCase();
      if (texte.includes(rechercheInputTexte)) {
        match = true;
        break;
      }
    }

    if (!match) {
      for (let j = 0; j < recette.ingredients.length; j += 1) {
        const ingredient = recette.ingredients[j].ingredient.toLowerCase();
        if (ingredient.includes(rechercheInputTexte)) {
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
  return recettesFiltrees;
}