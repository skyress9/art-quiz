import Quiz from "./Quiz.js";
import Score from "./Score.js";
import Observer from "./Observer.js";

class Categories {
  constructor(type) {
    this.type = type;
  }

  createCategories() {
    const div = document.createElement('div');
    div.className = 'categories-page hide';

    const cardsHTML = this.createHTML();

    div.innerHTML = `
    <div class="container">
      <div class="categories-header">
        <div class="categories-header__item categories-header__logo"></div>
        <button data-route="settings" class="categories-header__item btn categories-settings__btn"></button>
      </div>
      <div class="categories-menu">
        <div class="categories-menu__title">Категории</div>
        <button data-route="main" class="btn categories-home__btn">Домой</button>
      </div>
      <div class="categories-cards">
        ${cardsHTML}
      </div>
    </div>
    <footer class="footer">
      <div class="footer__item footer__logo"></div>
      <div class="footer__item footer__author">skyress9</div>
      <div class="footer__item footer__year">2021</div>
    </footer>`;

    div.querySelectorAll('.categories-cards__card').forEach(card => {
      card.addEventListener('click', e => {
        e.target.id == 'score' ? new Score(card.id, card) : new Quiz(card.id);
      })
    })

    return div;
  }

  createHTML() {
    const init = this.type == 'artists' ? 0 : 120;
    let html = '';
    let rounds = 0;
    
    for (let i = init; i < init + 120; i = i + 10) {
      let observerAnswer = Observer.getAnswersNum(rounds, this.type);
      let imgClass;

      if (observerAnswer.length === 0) imgClass = 'categories-cards__card-img-gray';
      else imgClass = '';

      html +=
      `<div id="${this.type}-${rounds}" class="categories-cards__card">
        <img class="categories-cards__card-img ${imgClass}"
          src="https://github.com/skyress9/image-data/blob/master/img/${i}.jpg?raw=true" alt="image">
        <div class="categories-cards__card-bottom">
          <div class="categories-cards__card-title">Раунд ${rounds + 1}</div>
          <div class="categories-cards__card-points">${observerAnswer}</div>
        </div>
        <div id="score" class="categories-card__card-score">Счёт</div>
      </div>`;


      rounds++;
    }



    return html;
  }

  render() {
    this.element = this.createCategories();
  }

}

export default Categories;