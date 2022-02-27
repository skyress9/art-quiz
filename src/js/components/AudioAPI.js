import Observer from "./Observer.js";

class AudioAPI {

  static right() {
    const audio = new Audio('./assets/audio/correctanswer.mp3');

    audio.volume = Observer.volume;

    if (Observer.volumeStatus == 'unmute') audio.play();
  }

  static wrong() {
    const audio = new Audio('./assets/audio/wronganswer.mp3');

    audio.volume = Observer.volume;

    if (Observer.volumeStatus == 'unmute') audio.play();
  }

  static end() {
    const audio = new Audio('./assets/audio/endround.mp3');

    audio.volume = Observer.volume;

    if (Observer.volumeStatus == 'unmute') audio.play();
  }

}

export default AudioAPI;