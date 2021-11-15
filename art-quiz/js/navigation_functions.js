export const backButton = document.querySelector('.back');
export const categoryButton = document.querySelector('.categories-icon');

export class Interface {
  static appearStartPage() {
    const startPage = document.querySelector('.container');
    startPage.classList.remove('hide');
  }

  static hideCategories() {
    const containerCategory = document.querySelectorAll('.categories');
    containerCategory.forEach((el) => el.classList.add('hidden', 'visually-hidden'));
  }

  static hideStartPage() {
    const startPage = document.querySelector('.container');
    startPage.classList.add('hide');
  }

  static appearBackIcon() {
    backButton.classList.remove('hide');
  }

  static hideBackIcon() {
    backButton.classList.add('hide');
  }

  static appearCategories(type) {
    const containerCategory = document.querySelector(`.${type}`);
    containerCategory.classList.remove('hidden');
    setTimeout(() => containerCategory.classList.remove('visually-hidden'));
  }

  static appearCategoryIcon(id) {
    categoryButton.classList.remove('hide');
    if (id > 11) categoryButton.classList.add('paintings-type');
    else categoryButton.classList.add('artists-type');
  }

  static hideCategoryIcon() {
    categoryButton.classList.add('hide');
    categoryButton.classList.remove('paintings-type', 'artists-type');
  }

  static appearQuizPage() {
    const quizPage = document.querySelector('.container-question');
    quizPage.classList.remove('hide');
  }

  static eliminateQuizPage() {
    const quizPage = document.querySelector('.container-question');
    if (quizPage) globalThis.game.removeChild(quizPage);
  }

  static eliminateResultsPage() {
    const resultsPage = document.querySelector('.container-results');
    if (resultsPage) globalThis.game.removeChild(resultsPage);
  }

  static eliminateModal() {
    const overlay = document.querySelector('.overlay');
    if (overlay) globalThis.game.removeChild(overlay);
  }

  static showStartPage() {
    Interface.appearStartPage();
    Interface.hideCategories();
    Interface.hideBackIcon();
    Interface.hideCategoryIcon();
    Interface.eliminateQuizPage();
    Interface.eliminateResultsPage();
  }

  static showCategories(type) {
    Interface.hideStartPage();
    Interface.appearCategories(type);
    Interface.appearBackIcon();
    Interface.hideCategoryIcon();
    Interface.eliminateQuizPage();
    Interface.eliminateResultsPage();
  }

  static showQuestion(id) {
    Interface.appearBackIcon();
    Interface.appearCategoryIcon(id);
    Interface.hideStartPage();
    Interface.hideCategories();
  }
}
