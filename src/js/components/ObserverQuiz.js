class ObserverQuiz {
  constructor() {
    this.points = 0;
    this.num = 0;
  }

  addPoint(type) {
    this[type]++;
  }
}

export default ObserverQuiz;