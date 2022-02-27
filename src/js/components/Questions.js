class Questions {
  static async getData() {
    const res = await fetch('./json/images.json');
    const data = await res.json();
    return data;
  }

  static async createQuestionsCategories(type) {
    const questions = await this.getData();
    const artistsQuestionsMaxLength = questions.length / 2;
    const picturesQuestionsMaxLength = questions.length - 1;

    const artistsQuestions = questions.slice(0, artistsQuestionsMaxLength);
    const picturesQuestions = questions.slice(artistsQuestionsMaxLength, picturesQuestionsMaxLength);
  
    return type == 'artists' ? artistsQuestions : picturesQuestions;
  }

  static async createCardsQuestions(type) {
    const questions = await this.createQuestionsCategories(type);
    const cardSize = 10;
    const cards = [];
    for (let i = 0; i < questions.length / cardSize; i++) {
      cards[i] = questions.slice((i * cardSize), (i * cardSize) + cardSize);
    }

    return cards;
  }
}

export default Questions;