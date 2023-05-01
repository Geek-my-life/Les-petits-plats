/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
class Recette {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
    this.article = this.create();
  }

  create() {
    const recettes = document.createElement("article");
    recettes.id = this.id;

    const ingredientsList = this.ingredients.map((ingredient) => {
      const quantity = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ""}` : "";
      const name = ingredient.ingredient;
      return `<li>${name} : ${quantity}</li>`;
    }).join("");

    recettes.innerHTML = `
        <div class="cartesRecettes">
          <div class="imageRecette"> </div> 
            <div class="boxTitre"> 
                <h2 class="titre">${this.name}</h2>
                <div class="temps"> 
                    <div class="iconeHorloge"><i class="fa-regular fa-clock"></i></div> 
                    <div>${this.time} min</div>
                </div>
            </div>
            <div class="boxIngredientPrepa">
              <div class="ingredient">
                <ul>${ingredientsList}</ul>
              </div>
              <div class="prepa">
                <div class="descriptionPrepa">${this.description}</div>
              </div>
            </div>
                
        </div>`;

    return recettes;
  }
}
