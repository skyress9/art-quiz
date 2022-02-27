import Router from "./Router.js";
import Questions from "./Questions.js";
import AnswerButtons from "./AnswerButtons.js";
import Popup from "./Popup.js";
import ObserverQuiz from "./ObserverQuiz.js";
import Observer from "./Observer.js";
import AudioAPI from "./AudioAPI.js";

class Quiz {
  constructor(value) {
    this.type = value.slice(0, value.indexOf('-'));
    this.id = value.slice(value.indexOf('-') + 1);
    this.answers = [];
    this.startQuiz();
  }

  createContainer(data, observer) {
    return data[this.id].map((e, index) => {
      const container = document.createElement('div');
      container.classList.add('container-quiz', 'hide');

      const popup = new Popup(index);
      const popupContainer = popup.createPopup();
      container.append(popupContainer);

      const title = this.createTitle(e);
      container.append(title);

      if (Observer.timeStatus == 'true') {
        const timer = this.createTimer();
        container.append(timer);
  
        container.startTimer = () => {
          timer.textContent -= 1;
      
          if (!popupContainer.classList.contains('hide')) return;
          
          if (timer.textContent < 1) {
            popup.showPopup(e, false, popupContainer)
            popupContainer.classList.remove('hide');
  
            observer.num = index + 1;
  
            this.answers.push(false);
  
            return;
          }
      
          setTimeout(() => {
            container.startTimer(timer, container);
          }, 1000);
        }
      }

      if (this.type == 'artists') {
        const img = this.createImg(e.imageNum);
        container.append(img);
      }

      const buttons = this.createButtons(data, e, observer);
      buttons.childNodes.forEach(button => {
        button.addEventListener('click', () => {
          popup.showPopup(e, button.isRight, popupContainer)
          if (popupContainer.classList.contains('hide')) {
            popupContainer.classList.remove('hide');

            observer.num = index + 1;
  
            if (button.isRight) {
              button.classList.add('right');
              observer.addPoint('points');

            } else {
              button.classList.add('wrong');

            }
  
            this.answers.push(button.isRight);
          }
        }, {once: true})
      })

      container.append(buttons);

      return container;
    });
  }

  createTitle(elem) {
    const title = document.createElement('div');
    title.classList.add('quiz__item', 'quiz__question');
    title.textContent = this.type == 'artists' ? 'Кто автор указанной картины?' : `Какую картину написал ${elem.author}?`;

    return title;
  }

  createTimer() {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.innerHTML = `${Observer.time + 2}`;

    return timer;
  }
  
  createImg(num) {
    const img = document.createElement('img');
    img.classList.add('quiz__item', 'quiz__img');

    img.src = `https://github.com/skyress9/image-data/blob/master/img/${num}.jpg?raw=true`;
    img.alt = 'Image';

    return img;
  }

  createButtons(data, container) {
    const buttonsContainer = document.createElement('div');
    this.type == 'artists' ? buttonsContainer.classList.add('quiz__item', 'quiz-answers') : buttonsContainer.classList.add('quiz__item', 'quiz-answers', 'quiz-answers__pictures');

    const answerButtons = new AnswerButtons(data, this.id, container, this.type);
    const buttons = answerButtons.createAnswers();

    buttons.forEach(button => {
      buttonsContainer.append(button);
    });

    return buttonsContainer;
  }

  createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = 
    `<div class="footer__item footer__logo"></div>
    <div class="footer__item footer__author">skyress9</div>
    <div class="footer__item footer__year">2021</div>`;

    return footer;
  }

  createCards(data) {
    const div = document.createElement('div');
    div.className = 'quiz-page hide';

    const observer = new ObserverQuiz();
   
    const container = this.createContainer(data, observer);

    div.append(container[observer.num]);

    Observer.timeStatus == 'true' ? container[observer.num].startTimer() : false;

    Router.openPage(container[observer.num]);

    div.addEventListener('click', e => {
      if (e.target.index != undefined) {
        if (e.target.index < container.length - 1) {
          Router.changePage(container[observer.num], div);

          Observer.timeStatus == 'true' ? container[observer.num].startTimer() : false;
        } else {
          const resultPopup = new Popup().showResultPopup(observer.points, this.type);
          Router.changePage(resultPopup, div);
          Observer.setAnswers(this.id, this.type, this.answers);

          AudioAPI.end();
        }
      }
    })

    const footer = this.createFooter();

    div.append(footer);


    Router.changePage(div);
  }

  async startQuiz() {
    const data = await Questions.createCardsQuestions(this.type);
    this.createCards(data);
  }

}

export default Quiz;