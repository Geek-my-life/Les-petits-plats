/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
function rechercheInput(recettes) {
  const rechercheInputTexte = document.querySelector(".rechercheInput").value.trim().toLowerCase();
  if (rechercheInputTexte.length > 2) {
    rechercheRecettes(recettes);
  } else {
    rechercheRecettes(recettes);
  }
}

function rechercheRecettes(recettes) {
  // Récupérer la valeur de l'input de recherche et la formater en minuscules
  const rechercheInputTexte = document.querySelector(".rechercheInput").value.trim().toLowerCase();

  // Filtrer les recettes en fonction de la valeur de recherche
  const recettesFiltrees = recettes.filter((recette) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    [recette.name, recette.description].some((texte) => texte.toLowerCase().includes(rechercheInputTexte))
    || recette.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(rechercheInputTexte)));

  // Si aucune recette ne correspond à la recherche, afficher un message d'erreur
  if (recettesFiltrees.length === 0) {
    document.querySelector(".boxRecettes").innerHTML = `
      <div class="messageErreurRecette"> 
        Aucune recette ne correspond à votre critère… <br> vous pouvez chercher « tarte aux pommes », « poisson », etc. 
      </div>`;
    document.querySelector(".boxRecettes").style.justifyContent = "center";
  } else {
    // Si des recettes correspondent à la recherche, afficher les recettes filtrées
    document.querySelector(".boxRecettes").style.justifyContent = "space-between";

    // Récupérer les ingrédients, appareils et ustensiles des recettes filtrées
    const ingredients = recettesFiltrees.reduce((resultats, recette) => [...resultats, ...recette.ingredients], []);
    const appareils = recettesFiltrees.reduce((resultats, recette) => [...resultats, recette.appliance], []);
    const ustensiles = recettesFiltrees.reduce((resultats, recette) => [...resultats, ...recette.ustensils], []);

    // Afficher les recettes filtrées et les tags de filtres correspondants
    recettesData(recettesFiltrees);
    rechercheFiltres("ingredients", ingredients, (ingredient) => createTag(ingredient, "tagIngredient", "#3282f7", recettes, rechercheTags));
    rechercheFiltres("appareils", appareils, (appareil) => createTag(appareil, "tagAppareil", "#68d9a4", recettes, rechercheTags));
    rechercheFiltres("ustensiles", ustensiles, (ustensil) => createTag(ustensil, "tagUstensile", "#ed6454", recettes, rechercheTags));
  }
}

function createTag(tagText, tagClass, tagColor, recettes, rechercheRecettes) {
  // Sélectionner la boîte de tags
  const boxTags = document.querySelector(".boxTags");
  // Vérifier si le tag existe déjà
  if (boxTags.querySelector(`span.tag[title="${tagText}"]`)) {
    // Si le tag existe déjà, sortir de la fonction
    return;
  }
  // Créer un élément <span> pour le tag
  const tag = document.createElement("span");
  // Ajouter le texte et l'attribut "title" avec le texte en tant que valeur
  tag.textContent = tagText;
  tag.setAttribute("title", tagText);
  // Ajouter les classes CSS "tag" et la classe passée en argument
  tag.classList.add("tag", tagClass);
  // Définir la couleur de fond avec la couleur passée en argument
  tag.style.backgroundColor = tagColor;

  // Créer un élément <i> pour le bouton de fermeture
  const closeIcon = document.createElement("i");
  // Ajouter les classes CSS pour afficher l'icône
  closeIcon.classList.add("fa-regular", "fa-circle-xmark", "fermeTag");
  // Définir la couleur de fond avec la couleur passée en argument
  closeIcon.style.backgroundColor = tagColor;

  // Ajouter un écouteur d'événements sur le clic du bouton de fermeture
  closeIcon.addEventListener("click", () => {
    // Supprimer l'élément <span> du tag
    tag.remove();
    // Supprimer l'élément <i> du bouton de fermeture
    closeIcon.remove();
    // Mettre à jour la liste des recettes affichées en appelant la fonction "rechercheRecettes" passée en argument
    rechercheRecettes(recettes);
  });

  // Ajouter l'élément <span> et l'élément <i> à la boîte de tags
  boxTags.appendChild(tag);
  boxTags.appendChild(closeIcon);

  // Mettre à jour la liste des recettes affichées en appelant la fonction "rechercheRecettes" passée en argument
  rechercheRecettes(recettes);
}

function rechercheTags(recettes) {
  // Sélectionner tous les tags présents
  const listeTags = document.querySelectorAll(".tag");

  // Si aucun tag n'est présent, afficher toutes les recettes
  if (listeTags.length === 0) {
    rechercheRecettes(recettes);
    return;
  }

  // Sélectionner le dernier tag ajouté
  const dernierTag = listeTags[listeTags.length - 1];
  const dernierTitre = dernierTag.title.toLowerCase();

  let recettesFiltrees = recettes;

  // Si le dernier tag est un tag ingrédient, filtrer les recettes qui contiennent cet ingrédient
  if (dernierTag.classList.contains("tagIngredient")) {
    recettesFiltrees = recettesFiltrees.filter((recette) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      recette.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === dernierTitre));
  } else if (dernierTag.classList.contains("tagAppareil")) {
    // Sinon, si c'est un tag appareil, filtrer les recettes qui utilisent cet appareil
    recettesFiltrees = recettesFiltrees.filter((recette) => recette.appliance.toLowerCase().includes(dernierTitre));
  } else {
    // Sinon, filtrer les recettes qui utilisent cet ustensile
    recettesFiltrees = recettesFiltrees.filter((recette) => recette.ustensils.includes(dernierTitre));
  }

  // Afficher les recettes filtrées
  rechercheRecettes(recettesFiltrees);
}

function rechercheFiltres(type, data, onclicked) {
  // Récupérer la valeur de la zone de recherche et la convertir en minuscules
  const rechercheInputTexte = document.querySelector(`.recherche${type.charAt(0).toUpperCase() + type.slice(1)}`).value.trim().toLowerCase();

  let liste;

  // Filtrer la liste de données en fonction du type de filtre
  switch (type) {
    case "ingredients":
      // Si la zone de recherche est vide ou contient "ingrédients", afficher tous les ingrédients
      // Sinon, filtrer les ingrédients pour n'afficher que ceux qui contiennent la chaîne de caractères recherchée
      liste = rechercheInputTexte === "ingrédients" ? data : data.filter((item) => item.ingredient.toLowerCase().includes(rechercheInput));
      break;
    default:
      // Si la zone de recherche est vide ou contient le type de filtre, afficher tous les éléments
      // Sinon, filtrer les éléments pour n'afficher que ceux qui contiennent la chaîne de caractères recherchée
      liste = rechercheInputTexte === type ? data : data.filter((item) => item.toLowerCase().includes(rechercheInput));
      break;
  }

  // Afficher les résultats filtrés en fonction du type de filtre
  switch (type) {
    case "ingredients":
      // Afficher la liste des ingrédients filtrés
      ingredientsData(liste, onclicked);
      break;
    case "appareils":
      // Afficher la liste des appareils filtrés
      appareilsData(liste, onclicked);
      break;
    case "ustensiles":
      // Afficher la liste des ustensiles filtrés
      ustensilesData(liste, onclicked);
      break;
    default:
      // Ne rien faire si le type de filtre est inconnu
      break;
  }
}
