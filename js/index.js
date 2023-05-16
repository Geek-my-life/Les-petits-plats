/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
// recuperation de la data
async function getRecettes() {
  return fetch("data/recettes.json").then((response) => response.json()); // récupère les données depuis le fichier json
}

async function recettesData(recettes) {
  const recettesSection = document.querySelector(".boxRecettes");
  // On vide la section des recettes
  recettesSection.innerHTML = "";
  recettes.sort((a, b) => a.name.localeCompare(b.name));

  const promises = recettes.map((recette) => {
    const userCardDOM = new Recette(recette);
    // on retourne l'article créé
    return userCardDOM.article;
  });
  Promise.all(promises).then((articles) => {
    // résolution promesses de création de cartes
    articles.forEach((article) => {
      recettesSection.appendChild(article);
    });
  });
}

async function ingredientsData(ingredients, onclicked) {
  const ingredientsSection = document.querySelector(".boxIngredients");
  // On vide la section des ingrédients
  ingredientsSection.innerHTML = "";

  // Création d'un seul objet Ingredient avec tous les ingrédients
  const allIngredients = new ListeIngredients(
    { id: "all", ingredients },
    onclicked,
  );

  // Ajout de l'article de l'objet Ingredient au DOM
  ingredientsSection.appendChild(allIngredients.article);
}

async function appareilsData(appareils, onclicked) {
  const appareilsSection = document.querySelector(".boxAppareils");
  // On vide la section des appareils
  appareilsSection.innerHTML = "";

  const promises = [
    new ListeAppareils({ id: "appliance", appliance: appareils }, onclicked),
  ];
  Promise.all(promises).then((articles) => {
    articles.forEach((article) => {
      appareilsSection.appendChild(article.article);
    });
  });
}

async function ustensilesData(ustensils, onclicked) {
  const ustensilesSection = document.querySelector(".boxUstensiles");
  // On vide la section des ustensiles
  ustensilesSection.innerHTML = "";

  const promises = [
    new ListeUstensiles({ id: "ustensiles", ustensils }, onclicked),
  ];
  Promise.all(promises).then((articles) => {
    // résolution promesses de création d'articles
    articles.forEach((article) => {
      ustensilesSection.appendChild(article.article);
    });
  });
}

// init
async function init() {
  // récupère les datas des photographes
  const { recettes } = await getRecettes();

  rechercherRecettes(recettes);
  eventFiltres();

  // Recherche principale
  document.querySelector(".rechercheInput").addEventListener("input", () => {
    rechercherRecettes(recettes);
  });
}

init();
