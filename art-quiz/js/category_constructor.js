import Quiz from './quiz.js';
import { createNodetoDom } from './base_functions.js';

export class Category {
  constructor(index) {
    this.index = index;
  }

  fillCategory(mode) {
    const category = createNodetoDom('div', 'category');
    const categoryNumber = createNodetoDom('div', 'number');
    categoryNumber.innerText = this.index + 1 - mode;
    const categoryImage = createNodetoDom('img', 'category-image not-colored');
    categoryImage.src = `./image-data/img/${this.index * 10}.jpg`;
    category.append(categoryNumber, categoryImage);
    categoryImage.addEventListener('click', () => { new Quiz(this.index).createQuiz(); });
    return category;
  }
}
function makeCategoryWrapper(sectionCategory, mode) {
  globalThis.game.append(sectionCategory);
  const categoryHeader = document.createElement('h3');
  categoryHeader.innerText = 'Choose round:';
  sectionCategory.append(categoryHeader);

  const containerCategory = createNodetoDom('div', 'categories_container');
  sectionCategory.append(containerCategory);
  const category = [];
  for (let i = mode; i < 12 + mode; i += 1) {
    category[i] = new Category(i).fillCategory(mode);
    containerCategory.append(category[i]);
  }
}
export function createCategoryArtistPage() {
  const sectionCategory = createNodetoDom('div', 'categories artists hide');
  makeCategoryWrapper(sectionCategory, 0);
}

export function createCategoryPaintingsPage() {
  const sectionCategory = createNodetoDom('div', 'categories paintings hide');
  makeCategoryWrapper(sectionCategory, 12);
}
