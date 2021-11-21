export default class Questions {
  constructor(id) {
    this.index = id;
  }

  async makeQuestion() {
    let questionText;
    if (this.index < 120) {
      const name = await new Questions(this.index).getName();
      questionText = `Who is the author of "${name}"?`;
    } else {
      const author = await new Questions(this.index).getAuthor();
      questionText = `Which picture was made by ${author}?`;
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
    for (let i = 0; i < 3; i += 1) {
      let fakeAuthor;
      let fakeImageSrc;
      do {
        let fakeId;
        do {
          fakeId = Math.round(Math.random() * 240);
        } while (fakeId === this.index);
        fakeAuthor = await new Questions(fakeId).getAuthor();
        fakeImageSrc = new Questions(fakeId).getImageSrc();
      } while (optionsAuthors.includes(fakeAuthor));
      optionsAuthors.push(fakeAuthor);
      optionsImg.push(fakeImageSrc);
    }
    /* eslint-enable no-await-in-loop */
    let shuffledOptions;
    if (this.index < 120) shuffledOptions = Questions.shuffle(optionsAuthors);
    else shuffledOptions = Questions.shuffle(optionsImg);
    return shuffledOptions;
  }

  async getRightAnswer() {
    const author = await new Questions(this.index).getAuthor();
    return author;
  }

  static async getImageData() {
    const images = './js/image_data.json';
    const res = await fetch(images);
    const data = await res.json();
    await data;
    return data;
  }

  getImageSrc() {
    const src = `./image-data/img/${this.index}.jpg`;
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
}
