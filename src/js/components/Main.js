class Main {
  constructor() {
    this.element = this.createMain();
  }

  createMain() {
    const div = document.createElement('div');
    div.className = 'main-page hide';
    div.innerHTML = `
    <div class="container">
      <div class="main__inner">
        <btn data-route="settings" class="btn main-settings__btn"></btn>
        <div class="main__logo"></div>
        <div class="main__menu">
          <button data-route="categoriesArtists" class="btn main__btn">Artists quiz</button>
          <button data-route="categoriesPictures" class="btn main__btn">Pictures quiz</button>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer__item footer__logo"></div>
      <div class="footer__item footer__author">skyress9</div>
      <div class="footer__item footer__year">2021</div>
    </footer>`;

    return div;
  }

  render() {
    this.element = this.createMain();
  }
}

export default Main;