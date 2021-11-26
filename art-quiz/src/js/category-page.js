import Interface from './interface.js';
import translation from './translation.js';
import Settings from './settings.js';
import Category from './categories.js';
import initial from './constants.js';

export default class CategoryPage {
  constructor(type) {
    this.type = type;
    if (this.type === 'artists') this.mode = initial.numberOfFirstArtistsQuizCategory;
    if (this.type === 'paintings') this.mode = initial.numberOfFirstPaintingsQuizCategory;
  }

  makeCategoryPage() {
    const sectionCategory = Interface.createNodetoDom(
      'div',
      `categories ${this.type} hidden visually-hidden`,
    );
    this.makeCategoryWrapper(sectionCategory);
  }

  makeCategoryWrapper(sectionCategory) {
    new Interface().game.append(sectionCategory);
    const categoryHeader = document.createElement('h3');
    categoryHeader.innerText = `${translation[0][new Settings().returnSettings()['language-key']]}:`;
    sectionCategory.append(categoryHeader);
    const containerCategory = Interface.createNodetoDom('div', 'categories_container');
    sectionCategory.append(containerCategory);
    const category = [];
    for (let i = this.mode; i < initial.quantityOfCategoriesInQuiz + this.mode; i += 1) {
      category[i] = new Category(i, this.mode).fillCategory();
      containerCategory.append(category[i]);
    }
  }
}
