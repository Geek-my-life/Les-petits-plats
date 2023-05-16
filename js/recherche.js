/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

function recupererValeurRecherche() {
  const rechercheInputTexte = document.querySelector(".rechercheInput").value.trim().toLowerCase();
  return rechercheInputTexte;
}

function filtrerRecettes(recettes, rechercheInputTexte) {
  const recettesFiltrees = recettes.filter((recette) => [recette.name, recette.description].some((texte) => texte.toLowerCase().includes(rechercheInputTexte))
    || recette.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(rechercheInputTexte)));
  return recettesFiltrees;
}

function filtrerRecettesTags(recettes, rechercheInputTexte) {
  // Sélectionner tous les tags présents
  const listeTags = document.querySelectorAll(".tag");
  const recettesFiltreesTexte = filtrerRecettes(recettes, rechercheInputTexte);

  // Si aucun tag n'est présent, afficher toutes les recettes
  if (listeTags.length === 0) {
    return recettesFiltreesTexte;
  }

  // Créer un tableau pour stocker les titres de tous les tags
  const titresTags = Array.from(listeTags).map((tag) => tag.title.toLowerCase());

  // Filtrer les recettes en fonction de tous les tags présents
  const recettesFiltreesTags = recettesFiltreesTexte.filter((recette) => titresTags.every((titre) => {
    const recetteTags = [
      ...(recette.ingredients || []).map((ingredient) => ingredient.ingredient.toLowerCase()),
      recette.appliance.toLowerCase(), ...(recette.ustensils || []).map((ustensile) => ustensile.toLowerCase())];
    return recetteTags.includes(titre);
  }));

  // Afficher les recettes filtrées
  return recettesFiltreesTags;
}

function afficherRecettes(recettesFiltrees) {
  const boxRecettes = document.querySelector(".boxRecettes");
  if (recettesFiltrees.length === 0) {
    boxRecettes.innerHTML = `
      <div class="messageErreurRecette"> 
        Aucune recette ne correspond à votre critère… <br> vous pouvez chercher « tarte aux pommes », « poisson », etc. 
      </div>`;
    boxRecettes.style.justifyContent = "center";
  } else {
    recettesData(recettesFiltrees);
    boxRecettes.style.justifyContent = "space-between";
  }
}

function recupererTags(recettesFiltrees) {
  const tagsIngredients = recettesFiltrees.reduce((resultats, recette) => [...resultats, ...recette.ingredients], []);
  const tagsAppareils = recettesFiltrees.reduce((resultats, recette) => [...resultats, recette.appliance], []);
  const tagsUstensiles = recettesFiltrees.reduce((resultats, recette) => [...resultats, ...recette.ustensils], []);
  return { tagsIngredients, tagsAppareils, tagsUstensiles };
}

function afficherTags(tags, recettesFiltrees) {
  rechercheFiltres("ingredients", tags.tagsIngredients, (ingredient) => creerTag(ingredient, "tagIngredient", "#3282f7", recettesFiltrees, rechercherRecettes));
  rechercheFiltres("appareils", tags.tagsAppareils, (appareil) => creerTag(appareil, "tagAppareil", "#68d9a4", recettesFiltrees, rechercherRecettes));
  rechercheFiltres("ustensiles", tags.tagsUstensiles, (ustensil) => creerTag(ustensil, "tagUstensile", "#ed6454", recettesFiltrees, rechercherRecettes));
  // Recherche ingrédients
  document
    .querySelector(".rechercheIngredients")
    .addEventListener("input", () => {
      rechercheFiltres("ingredients", tags.tagsIngredients, (ingredient) => creerTag(ingredient, "tagIngredient", "#3282f7", recettesFiltrees, rechercherRecettes));
    });

  // Recherche appareils
  document
    .querySelector(".rechercheAppareils")
    .addEventListener("input", () => {
      rechercheFiltres("appareils", tags.tagsAppareils, (appareil) => creerTag(appareil, "tagAppareil", "#68d9a4", recettesFiltrees, rechercherRecettes));
    });

  // Recherche ustensiles
  document
    .querySelector(".rechercheUstensiles")
    .addEventListener("input", () => {
      rechercheFiltres("ustensiles", tags.tagsUstensiles, (ustensil) => creerTag(ustensil, "tagUstensile", "#ed6454", recettesFiltrees, rechercherRecettes));
    });
}

function rechercherRecettes(recettes) {
  const rechercheInputTexte = recupererValeurRecherche();
  const recettesFiltrees = filtrerRecettesTags(recettes, rechercheInputTexte.length > 2 ? rechercheInputTexte : "");
  afficherRecettes(recettesFiltrees);
  const tags = recupererTags(recettesFiltrees);
  afficherTags(tags, recettesFiltrees);
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
      liste = rechercheInputTexte === "ingrédients" ? data : data.filter((item) => item.ingredient.toLowerCase().includes(rechercheInputTexte));
      break;
    default:
      // Si la zone de recherche est vide ou contient le type de filtre, afficher tous les éléments
      // Sinon, filtrer les éléments pour n'afficher que ceux qui contiennent la chaîne de caractères recherchée
      liste = rechercheInputTexte === type ? data : data.filter((item) => item.toLowerCase().includes(rechercheInputTexte));
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

function creerTagElement(tagText, tagClass, tagColor) {
  const tag = document.createElement("span");
  tag.textContent = tagText;
  tag.setAttribute("title", tagText);
  tag.classList.add("tag", tagClass);
  tag.style.backgroundColor = tagColor;
  return tag;
}

function creerCloseIcon(tagColor) {
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-regular", "fa-circle-xmark", "fermeTag");
  closeIcon.style.backgroundColor = tagColor;
  return closeIcon;
}

function ajoutCloseEvent(tag, closeIcon, recettes, filtrerRecettesTags) {
  closeIcon.addEventListener("click", () => {
    tag.remove();
    closeIcon.remove();
    filtrerRecettesTags(recettes);
  });
}

function creerTag(tagText, tagClass, tagColor, recettes, filtrerRecettesTags) {
  const boxTags = document.querySelector(".boxTags");
  if (boxTags.querySelector(`span.tag[title="${tagText}"]`)) {
    return;
  }
  const tag = creerTagElement(tagText, tagClass, tagColor);
  const closeIcon = creerCloseIcon(tagColor);
  ajoutCloseEvent(tag, closeIcon, recettes, filtrerRecettesTags);
  boxTags.appendChild(tag);
  boxTags.appendChild(closeIcon);
  filtrerRecettesTags(recettes);
}

function eventFiltres() {
  const sectionFiltres = document.querySelectorAll(".sectionFiltres");
  const sectionFiltresArray = Array.from(sectionFiltres);
  const titreFiltres = document.querySelectorAll(".tagInput");
  const originalValues = [];
  let currentBox = null;

  // Stocker les valeurs d'origine dans un tableau
  titreFiltres.forEach((input) => {
    originalValues.push(input.value);
  });

  sectionFiltres.forEach((element) => {
    element.addEventListener("click", () => {
    // Vérifier si une boîte est déjà ouverte
      if (currentBox !== null && currentBox !== element) {
      // Ferme la boîte en réappliquant "tailleMini" et en réinitialisant la valeur de l'entrée
        currentBox.classList.add("tailleMini");
        const input = currentBox.querySelector(".tagInput");
        const oldValue = input.value;
        input.value = originalValues[sectionFiltresArray.indexOf(currentBox)];
        if (oldValue !== "") {
          const event = new Event('input');
          input.dispatchEvent(event);
        }
      }
      // Ouvrir la boîte cliquée en supprimant la classe "tailleMini" et en vidant l'entrée
      element.classList.remove("tailleMini");
      const tagInput = element.querySelector(".tagInput");
      tagInput.value = "";
      // Définir la variable currentBox sur la boîte actuellement ouverte
      currentBox = element;
    });
  });

  document.addEventListener("click", (event) => {
  // Vérifier si le clic a été effectué à l'extérieur de la boîte actuellement ouverte
    if (currentBox !== null && !currentBox.contains(event.target)) {
    // Ferme la boîte en réappliquant "tailleMini" et en réinitialisant la valeur de l'entrée
      currentBox.classList.add("tailleMini");
      const input = currentBox.querySelector(".tagInput");
      const oldValue = input.value;
      input.value = originalValues[sectionFiltresArray.indexOf(currentBox)];
      if (oldValue !== "") {
        const event = new Event('input');
        input.dispatchEvent(event);
      }
      // Définir la variable currentBox sur nulle
      currentBox = null;
    }
  });
}
