/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
class ListeAppareils {
  constructor(data, onclicked) {
    this.id = data.id;
    this.appliance = data.appliance;
    this.onclicked = onclicked;
    this.article = this.create();
  }

  create() {
    // Création d'un élément ul pour la liste d'ustensiles
    const ul = document.createElement("ul");

    // Tri des appareils par ordre alphabétique en ignorant la casse et en enlevant les espaces
    const sortedAppareils = this.appliance
      .map((appareil) => appareil.toLowerCase().trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    // Ajout d'un élément li pour chaque appareil dans la liste triée
    sortedAppareils.forEach((appareil) => {
      const li = document.createElement("li");
      li.setAttribute("class", "choixAppareils");
      li.textContent = appareil;
      ul.appendChild(li);

      // Ajout de l'événement clic pour ajouter un tag
      li.addEventListener("click", () => {
        this.onclicked(appareil);
      });
    });

    // Retourne la liste des appareils triés
    return ul;
  }
}
