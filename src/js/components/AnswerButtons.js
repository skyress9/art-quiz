class AnswerButtons {
  constructor(data, id, element, cat) {
    this.data = data;
    this.id = id;
    this.element = element;
    this.cat = cat;

    this.createAnswers();
  }

  createButton(type) {
    const button = this.cat == 'artists' ? document.createElement('button') : document.createElement('div');

    if (this.cat == 'artists') {
      button.classList.add('btn', 'quiz-answers__btn');
  
      if (type) {
        button.textContent = this.data[Math.round(Math.random() * 11)][Math.round(Math.random() * 9)]['author'];
        button.isRight = false;
      } else {
        button.textContent = this.element['author']
        button.isRight = true;
      }
    } else {
      button.classList.add('quiz-answers__picture');

      if (type) {
        button.style.backgroundImage = `url("https://raw.githubusercontent.com/skyress9/image-data/master/img/${this.data[Math.round(Math.random() * 11)][Math.round(Math.random() * 9)]['imageNum']}.jpg")` ;
        
        button.isRight = false;
      } else {
        button.style.backgroundImage = `url("https://raw.githubusercontent.com/skyress9/image-data/master/img/${this.element['imageNum']}.jpg")`;
        button.isRight = true;
      }
    }


    return button;
  }

  shuffleButtons(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  createAnswers() {
    let arr = [];

    arr.push(this.createButton());

    while (arr.length < 4) {
      const button = this.createButton('wrong');

      if (!arr.some(e => this.cat == 'artists' ? e.textContent == button.textContent : e.style.backgroundImage == button.style.backgroundImage)) arr.push(button);
    }

    arr = this.shuffleButtons(arr);

    return arr;
  }
}

export default AnswerButtons;