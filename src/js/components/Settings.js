import Observer from "./Observer.js";

class Settings {
  constructor() {
    this.element;
  }

  createSettings() {
    const div = document.createElement('div');
    div.className = 'settings-page hide';

    const container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = `
    <div class="settings-header">
      <button data-route="main" class="btn settings-home__btn">Домой</button>
      <div class="settings-header__title">Настройки</div>
    </div>`;

    const content = this.createContent();
    container.append(content);

    div.append(container);

    div.insertAdjacentHTML('beforeend', 
    `<footer class="footer">
      <div class="footer__item footer__logo"></div>
      <div class="footer__item footer__author">skyress9</div>
      <div class="footer__item footer__year">2021</div>
    </footer>`);

    return div;
  }

  createContent() {
    const div = document.createElement('div');
    div.classList.add('settings-content');

    const volume = this.createVolume();
    const timeStatus = this.createTimeStatus();
    const timeSelect = this.createTimeSelect();

    div.append(volume, timeStatus, timeSelect);

    return div;
  }

  createVolume() {
    const div = document.createElement('div');
    div.classList.add('settings__item', 'settings-volume');
    div.innerHTML = `<div class="settings-title settings-volume__title">Громкость</div>`;

    const input = document.createElement('input');
    input.classList.add('settings-volume__input');
    input.type = 'range';
    input.value = Observer.volume * 100;

    input.addEventListener('input', () => {
      Observer.setVolume(Number((input.value / 100).toFixed(1)));
    })

    const button = document.createElement('button');
    Observer.volumeStatus == 'mute' ? button.classList.add('btn', 'settings-volume__button') : button.classList.add('btn', 'settings-volume__button', 'unmute');

    button.addEventListener('click', () => {
      button.classList.toggle('unmute');

      if (button.classList.contains('unmute')) {
        Observer.setVolumeStatus('unmute');
      } else {
        Observer.setVolumeStatus('mute');
      }
    })

    div.append(input, button);

    return div;
  }

  createTimeStatus() {
    const div = document.createElement('div');
    div.classList.add('settings__item', 'settings-time');
    div.innerHTML = '<div class="settings-title settings-time__title">Время</div>';

    const checkContainer = document.createElement('div');
    checkContainer.classList.add('settings-time__checkbox');

    const input = document.createElement('input');
    input.classList.add('settings-time__turn');
    input.id = 'time-turn';
    input.name = 'time-turn';
    input.type = 'checkbox';
    input.checked = Observer.timeStatus == 'true' ? true : false;

    input.addEventListener('click', () => {
      Observer.setTimeStatus(input.checked);
    })

    checkContainer.append(input);
    checkContainer.insertAdjacentHTML('beforeend', `<label for="time-turn"></label>`);

    div.append(checkContainer);

    return div;
  }

  createTimeSelect() {
    const div = document.createElement('div');
    div.classList.add('settings__item', 'settings-answer');
    div.innerHTML = `<div class="settings-title settings-answer__title">Время на ответ</div>`;

    const inner = document.createElement('div');
    inner.classList.add('settings-answer__inner');

    const buttonMinus = document.createElement('button');
    buttonMinus.classList.add('btn', 'settings-answer__btn', 'settings-answer__btn-minus');
    buttonMinus.textContent = '–';
    buttonMinus.addEventListener('click', () => {
      if (Observer.time > 5) {
        Observer.setTime('-');
        time.textContent = Observer.time;
      }
    });

    const buttonPlus = document.createElement('button');
    buttonPlus.classList.add('btn', 'settings-answer__btn', 'settings-answer__btn-plus');
    buttonPlus.textContent = '+';
    buttonPlus.addEventListener('click', () => {
      if (Observer.time < 30) {
        Observer.setTime();
        time.textContent = Observer.time;
      }
    });
    
    const time = document.createElement('div');
    time.classList.add('settings-answer__time');
    time.textContent = Observer.time;

    inner.append(buttonMinus, time, buttonPlus);

    div.append(inner);

    return div;
  }

  render() {
    this.element = this.createSettings();
  }
}

export default Settings;