import translation from './translation.js';
import Settings from './settings.js';
import initial from './constants.js';

export default class Questions {
  constructor(id) {
    this.index = id;
  }

  async makeQuestion() {
    let questionText;
    if (this.index < initial.quantityOfQuestionsInQuiz) {
      const name = await new Questions(this.index).getName();
      questionText = `${translation[1][new Settings().returnSettings()['language-key']]} "${name}"?`;
    } else {
      const author = await new Questions(this.index).getAuthor();
      questionText = `${translation[2][new Settings().returnSettings()['language-key']]} ${author}?`;
    }
    return questionText;
  }

  async makeOptions() {
    const optionsAuthors = [];
    const optionsImg = [];
    const author = await new Questions(this.index).getAuthor();
    const imageSrc = new Questions(this.index).getImageSrc();
    optionsAuthors.push(author);
    optionsImg.push(imageSrc);
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < initial.quantityOfOptions - 1; i += 1) {
      let fakeAuthor;
      let fakeImageSrc;
      do {
        let fakeId;
        do {
          fakeId = Math.round(Math.random() * initial.totalQuantityOfQuestions);
        } while (fakeId === this.index);
        fakeAuthor = await new Questions(fakeId).getAuthor();
        fakeImageSrc = new Questions(fakeId).getImageSrc();
      } while (optionsAuthors.includes(fakeAuthor));
      optionsAuthors.push(fakeAuthor);
      optionsImg.push(fakeImageSrc);
    }
    /* eslint-enable no-await-in-loop */
    let shuffledOptions;
    if (this.index < initial.quantityOfQuestionsInQuiz) {
      shuffledOptions = Questions.shuffle(optionsAuthors);
    } else shuffledOptions = Questions.shuffle(optionsImg);
    return shuffledOptions;
  }

  async getRightAnswer() {
    const author = await new Questions(this.index).getAuthor();
    return author;
  }

  static async getImageData() {
    let images;
    if (new Settings().returnSettings()['language-key'] === '0') images = './assets/image-data/image_data_EN.json';
    else images = './assets/image-data/image_data_RU.json';
    const res = await fetch(images);
    const data = await res.json();
    await data;
    return data;
  }

  getImageSrc() {
    const src = `./assets/image-data/img/${this.index}.jpg`;
    return src;
  }

  async getName() {
    const data = await Questions.getImageData();
    await data.images[this.index].name;
    return data.images[this.index].name;
  }

  async getAuthor() {
    const data = await Questions.getImageData();
    await data.images[this.index].author;
    return data.images[this.index].author;
  }

  async getYear() {
    const data = await Questions.getImageData();
    await data.images[this.index].year;
    return data.images[this.index].year;
  }

  static shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  static preloadImages() {
    const imagesPreload = [];
    for (let i = 0; i < initial.totalQuantityOfQuestions; i += 1) {
      const img = new Image();
      img.src = `./assets/image-data/img/${i}.jpg`;
      imagesPreload.push(img);
    }
  }
}
