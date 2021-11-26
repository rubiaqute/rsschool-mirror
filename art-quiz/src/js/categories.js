import Quiz from './quiz.js';
import Interface from './interface.js';
import initial from './constants.js';

export default class Category {
  constructor(index, mode) {
    this.index = index;
    this.mode = mode;
  }

  fillCategory() {
    const category = Interface.createNodetoDom('div', 'category');
    const categoryNumber = Interface.createNodetoDom('div', 'number');
    categoryNumber.innerText = this.index + 1 - this.mode;
    const categoryImage = Interface.createNodetoDom('img', 'category-image not-colored');
    categoryImage.src = `./assets/image-data/img/${this.index * initial.quantityOfQuestionsInCategory}.jpg`;
    category.append(categoryNumber, categoryImage);
    categoryImage.addEventListener('click', () => {
      new Quiz(this.index).createQuiz();
    });
    return category;
  }
}
