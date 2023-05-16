/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
class ListeUstensiles {
  constructor(data, onclicked) {
    this.id = data.id;
    this.ustensils = data.ustensils;
    this.onclicked = onclicked;
    this.article = this.create();
  }

  create() {
    // Création d'un élément ul pour la liste d'ustensiles
    const ul = document.createElement("ul");

    // Tri des ustensiles par ordre alphabétique en ignorant la casse et en enlevant les espaces
    const sortedUstensils = this.ustensils
      .map((ustensil) => ustensil.toLowerCase().trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    // Ajout d'un élément li pour chaque ustensile dans la liste triée
    sortedUstensils.forEach((ustensile) => {
      const li = document.createElement("li");
      li.setAttribute("class", "choixUstensiles");
      li.setAttribute("aria-label", ustensile);
      li.textContent = ustensile;
      ul.appendChild(li);

      // Ajout de l'événement clic pour ajouter un tag
      li.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onclicked(ustensile);
      });
    });

    // Retourne la liste des ustensiles triés
    return ul;
  }
}
