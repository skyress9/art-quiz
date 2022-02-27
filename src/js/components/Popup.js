import AudioAPI from "./AudioAPI.js";

class Popup {
  constructor(index) {
    this.popupContainer = this.createPopup();
    this.index = index;
  }

  createButton() {
    const button = document.createElement('button'); 
    button.classList.add('btn', 'popup__btn');
    button.textContent = 'Continue';
    button.index = this.index;
    
    return button;
  }

  createPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup', 'hide');

    return popup;
  }

  showPopup(e, status, container) {
    const button = this.createButton();

    container.innerHTML = `
    <div class="overlay"></div>
    <div class="popup__inner">
      <div class="popup-img">
        <div class="popup-img__image" style="background-image: url('https://raw.githubusercontent.com/skyress9/image-data/master/img/${e.imageNum}.jpg');"></div>
        <div class="popup-img__boolean ${status}"></div>
      </div>

      <div class="popup-title">${e.name}</div>

      <div class="popup__about">${e.author}, ${e.year}</div>
    </div>`

    container.querySelector('.popup__inner').append(button);

    status == true ? AudioAPI.right() : AudioAPI.wrong();

    return container;
  }

  showResultPopup(result, type) {
    const container = this.createPopup()
    container.classList.add('popup-result', 'hide');
    type = type[0].toUpperCase() + type.slice(1);

    container.innerHTML = `
    <div class="overlay"></div>
    <div class="popup__inner">
      <div class="popup-img__result"></div>

      <div class="popup-title popup-title__result">Congratulations!</div>

      <div class="popup-result__score">${result}/10</div>

      <div class="popup-result__buttons">
        <button data-route="main" class="btn popup__btn">Home</button>
        <button data-route="categories${type}" class="btn popup__btn popup__btn-continue">Next quiz</button>
      </div>
    </div>`;

    return container;
  }

}

export default Popup;