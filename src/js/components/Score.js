import Router from "./Router.js";
import Observer from "./Observer.js";
import Questions from "./Questions.js";

class Score {
  constructor(value) {
    this.type = value.slice(0, value.indexOf('-'));
    this.id = value.slice(value.indexOf('-') + 1);

    this.createScore().then(data => {
      Router.changePage(data);
    })
  }

  async createScore() {
    const div = document.createElement('div');
    div.classList.add('score-page', 'hide');

    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `
    <div class="footer__item footer__logo"></div>
    <div class="footer__item footer__author">skyress9</div>
    <div class="footer__item footer__year">2021</div>`

    const container = document.createElement('div');
    container.classList.add('container');

    const data = await Questions.createCardsQuestions(this.type);
    const cards = this.createCards(data[this.id])

    const img = this.createImage();
    container.append(img);

    container.innerHTML += `
    <div class="score-page__nav">
      <div class="score-page__title">Счёт</div>
      <button data-route="categories${this.type[0].toUpperCase() + this.type.slice(1)}" class="btn btn-back__score">Назад</button>
    </div>`

    container.append(cards)

    div.append(container);

    div.append(footer);

    return div;
  }

  createCards(data) {
    const container = document.createElement('div');
    container.classList.add('score-page__cards');
    const answers = Observer.getAnswers(Number(this.id), this.type);

    for (let i = 0; i < data.length; i++) {
      const card = document.createElement('div');
      card.classList.add('score-page__cards-card');
      if (answers === null || !answers[i]) card.classList.add('score-page__cards-card-gray');

      const cardAbout = document.createElement('div');

      cardAbout.classList.add('score__page-cards__card-about');

      cardAbout.innerHTML = `
      <div class="score-page__cards-name hide">${data[i].name}</div>
      <div class="score-page__cards-author hide">${data[i].author}</div>
      <div class="score-page__cards-year hide">${data[i].year}</div>`

      card.style.backgroundImage = `url("https://raw.githubusercontent.com/skyress9/image-data/master/full/${data[i].imageNum}full.jpg")`;

      card.append(cardAbout);

      card.addEventListener('click', () => {
        cardAbout.childNodes.forEach(e => {
          if (e.nodeName == 'DIV') e.classList.toggle('hide');
        });
      })

      container.append(card);
    }

    return container;
  }

  createImage() {
    const container = document.createElement('div');
    container.classList.add('score-page__img');
    container.style.backgroundImage = `url("https://raw.githubusercontent.com/skyress9/image-data/master/full/${this.id}full.jpg")`
    container.innerHTML = `
    <div class="score-page__img-number">${Number(this.id) + 1}</div>
    <div class="score-page__img-logo"></div>
    <div class="score-page__img-score">${Observer.getAnswersNum(Number(this.id), this.type)}</div>`;

    return container
  }
}

export default Score;
