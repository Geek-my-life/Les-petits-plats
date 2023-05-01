/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
class ListeIngredients {
  constructor(data, onclicked) {
    this.id = data.id;
    this.ingredients = data.ingredients;
    this.onclicked = onclicked;
    this.article = this.create();
  }

  create() {
    // Création d'un élément ul pour la liste d'ingrédients
    const ul = document.createElement("ul");

    // Tri des ingrédients par ordre alphabétique en ignorant la casse et en enlevant les espaces
    const sortedIngredients = this.ingredients
      .map((ingredient) => ingredient.ingredient.toLowerCase().trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    // Ajout d'un élément li pour chaque ingrédient dans la liste triée
    sortedIngredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.setAttribute("class", "choixIngredients");
      li.setAttribute("aria-label", ingredient);
      li.textContent = ingredient;
      ul.appendChild(li);

      // Ajout de l'événement clic pour ajouter un tag
      li.addEventListener("click", () => {
        this.onclicked(ingredient);
      });
    });

    // Retourne la liste des ingrédients triés
    return ul;
  }
}
