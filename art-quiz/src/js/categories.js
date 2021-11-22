import Quiz from './quiz.js';
import Interface from './interface.js';

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
    categoryImage.src = `./assets/image-data/img/${this.index * 10}.jpg`;
    category.append(categoryNumber, categoryImage);
    categoryImage.addEventListener('click', () => {
      new Quiz(this.index).createQuiz();
    });
    return category;
  }

  makeCategoryWrapper(sectionCategory) {
    new Interface().game.append(sectionCategory);
    const categoryHeader = document.createElement('h3');
    categoryHeader.innerText = 'Choose round:';
    sectionCategory.append(categoryHeader);

    const containerCategory = Interface.createNodetoDom('div', 'categories_container');
    sectionCategory.append(containerCategory);
    const category = [];
    for (let i = this.mode; i < 12 + this.mode; i += 1) {
      category[i] = new Category(i, this.mode).fillCategory();
      containerCategory.append(category[i]);
    }
  }

  createCategoryPage(type) {
    const sectionCategory = Interface.createNodetoDom(
      'div',
      `categories ${type} hidden visually-hidden`,
    );
    new Category('', this.mode).makeCategoryWrapper(sectionCategory);
  }
}
