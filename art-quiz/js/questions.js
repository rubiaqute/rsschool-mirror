import { getImageSrc, getAuthor, getName } from './base_functions.js';

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
export default class Questions {
  constructor(id) {
    this.id = id;
  }

  async makeQuestion() {
    let questionText;
    if (this.id < 120) {
      const name = await getName(this.id);
      questionText = `Who is the author of "${name}"?`;
    } else {
      const author = await getAuthor(this.id);
      questionText = `Which picture was made by ${author}?`;
    }
    return questionText;
  }

  async makeOptions() {
    const optionsAuthors = [];
    const optionsImg = [];
    const author = await getAuthor(this.id);
    const imageSrc = getImageSrc(this.id);
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
        } while (fakeId === this.id);
        fakeAuthor = await getAuthor(fakeId);
        fakeImageSrc = getImageSrc(fakeId);
      } while (optionsAuthors.includes(fakeAuthor));
      optionsAuthors.push(fakeAuthor);
      optionsImg.push(fakeImageSrc);
    }
    /* eslint-enable no-await-in-loop */
    let shuffledOptions;
    if (this.id < 120) shuffledOptions = shuffle(optionsAuthors);
    else shuffledOptions = shuffle(optionsImg);
    return shuffledOptions;
  }

  async getRightAnswer() {
    const author = await getAuthor(this.id);
    return author;
  }
}
