import Categories from "./Categories.js";
import Main from "./Main.js";
import Router from "./Router.js";
import Settings from "./Settings.js";

class App {
  constructor() {
    const app = document.createElement('div');
    app.className = 'app';
    this.root = app;
    document.body.prepend(this.root);
    
    this.pages = {
      main: new Main(),
      categoriesArtists: new Categories('artists'),
      categoriesPictures: new Categories('pictures'),
      settings: new Settings()
    }

    Router.root = this.root;

    Router.pages = this.pages;

    this.root.append(this.pages.main.element);

    Router.openPage(this.root.firstElementChild);

    this.root.addEventListener('click', e => {
      if (e.target.dataset.route) {
        Router.changePage(e.target.dataset.route);
      }
    })
  }

}

export default App;