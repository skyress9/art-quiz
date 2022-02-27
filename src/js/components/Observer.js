class Observer {

  static answers = localStorage.getItem('answers') ? JSON.parse(localStorage.getItem('answers')) : this.trackAnswers();

  static timeStatus = localStorage.getItem('timeStatus') ? localStorage.getItem('timeStatus') : 'false';
  static time = localStorage.getItem('time') ? Number(localStorage.getItem('time')) : 5;

  static volumeStatus = localStorage.getItem('volumeStatus') ? localStorage.getItem('volumeStatus') : 'mute';
  static volume = localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5;

  static trackAnswers() {
    let answers = [];
    const answersLength = 24;

    for (let i = 0; i < answersLength; i++) {
      answers[i] = null;
    }

    localStorage.setItem('answers', JSON.stringify(answers));
    return answers;
  }

  static setAnswers(id, type, points) {
    this.answers[type == 'artists' ? id : Number(id) + 12] = points;
    localStorage.setItem('answers', JSON.stringify(this.answers))
  }

  static getAnswersNum(round, type) {
    let count = 0;
    type == 'artists' ? round : round += 12;

    if (this.answers[round] === null) return '';

    this.answers[round].forEach(e => {
      if (e === true) count++;
    })

    return count + '/10';
  }

  static getAnswers(round, type) {
    type == 'artists' ? round : round += 12;

    return this.answers[round];
  }

  static setTimeStatus(status) {
    this.timeStatus = String(status);
    localStorage.setItem('timeStatus', String(status))
  }

  static setTime(type) {
    type == '-' ? this.time -= 5 : this.time += 5;
    localStorage.setItem('time', this.time);
  }

  static setVolume(value) {
    this.volume = value;
    localStorage.setItem('volume', value)
  }

  static setVolumeStatus(status) {
    this.volumeStatus = status;
    localStorage.setItem('volumeStatus', status);
  }

}

export default Observer;