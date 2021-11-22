export default class Interface {
  constructor() {
    this.game = document.querySelector('.wrapper');
    this.backButton = document.querySelector('.back');
    this.categoryButton = document.querySelector('.categories-icon');
    this.settingsButton = document.querySelector('.settings');
    this.gameSelector = document.querySelectorAll('.game-select');
  }

  static async createModalWrapper() {
    const modalContainer = Interface.createNodetoDom('div', 'modal-container');
    // modalContainer.innerHTML = await template;
    const overlay = Interface.createNodetoDom('div', 'overlay');
    await overlay.append(modalContainer);
    new Interface().game.append(overlay);
    setTimeout(() => modalContainer.classList.add('animated'), 500);
    return modalContainer;
  }

  static createNodetoDom(element, ...classes) {
    const node = document.createElement(element);
    node.className = classes;
    return node;
  }

  static appearStartPage() {
    const startPage = document.querySelector('.container');
    startPage.classList.remove('hide');
  }

  static appearSettings() {
    const settingsPage = document.querySelector('.container-settings');
    settingsPage.classList.remove('hidden');
    setTimeout(() => settingsPage.classList.add('loaded'), 100);
  }

  static hideCategories() {
    const containerCategory = document.querySelectorAll('.categories');
    containerCategory.forEach((el) => el.classList.add('hidden', 'visually-hidden'));
  }

  static hideSettings() {
    const settingsPage = document.querySelector('.container-settings');
    settingsPage.classList.remove('loaded');
    settingsPage.classList.add('hidden');
  }

  static hideStartPage() {
    const startPage = document.querySelector('.container');
    startPage.classList.add('hide');
  }

  static appearBackIcon() {
    new Interface().backButton.classList.remove('hide');
  }

  static hideBackIcon() {
    new Interface().backButton.classList.add('hide');
  }

  static appearSettingsIcon() {
    new Interface().settingsButton.classList.remove('hide');
  }

  static hideSettingsIcon() {
    new Interface().settingsButton.classList.add('hide');
  }

  static appearCategories(type) {
    const containerCategory = document.querySelector(`.${type}`);
    containerCategory.classList.remove('hidden');
    setTimeout(() => containerCategory.classList.remove('visually-hidden'));
  }

  static appearCategoryIcon(id) {
    new Interface().categoryButton.classList.remove('hide');
    console.log(id);
    if (id > 11) new Interface().categoryButton.classList.add('paintings-type');
    else new Interface().categoryButton.classList.add('artists-type');
  }

  static hideCategoryIcon() {
    new Interface().categoryButton.classList.add('hide');
    new Interface().categoryButton.classList.remove('paintings-type', 'artists-type');
  }

  static appearQuizPage() {
    const quizPage = document.querySelector('.container-question');
    quizPage.classList.remove('hide');
  }

  static eliminateQuizPage() {
    const quizPage = document.querySelector('.container-question');
    if (quizPage) new Interface().game.removeChild(quizPage);
  }

  static eliminateResultsPage() {
    const resultsPage = document.querySelector('.container-results');
    if (resultsPage) new Interface().game.removeChild(resultsPage);
  }

  static eliminateModal() {
    const overlay = document.querySelector('.overlay');
    if (overlay) new Interface().game.removeChild(overlay);
  }

  static showStartPage() {
    Interface.appearStartPage();
    Interface.hideCategories();
    Interface.hideBackIcon();
    Interface.hideCategoryIcon();
    Interface.eliminateQuizPage();
    Interface.eliminateResultsPage();
    Interface.hideSettings();
    Interface.appearSettingsIcon();
  }

  static showCategories(type) {
    Interface.hideStartPage();
    Interface.appearCategories(type);
    Interface.appearBackIcon();
    Interface.hideCategoryIcon();
    Interface.eliminateQuizPage();
    Interface.eliminateResultsPage();
    Interface.hideSettingsIcon();
    // Interface.appearSettingsIcon();
  }

  static showQuestion(id) {
    Interface.appearBackIcon();
    Interface.appearCategoryIcon(id);
    Interface.hideStartPage();
    Interface.hideCategories();
    Interface.hideSettingsIcon();
  }

  static showSettings() {
    Interface.appearBackIcon();
    Interface.hideStartPage();
    Interface.hideCategories();
    Interface.hideCategoryIcon();
    Interface.appearSettings();
    Interface.hideSettingsIcon();
  }
}
new Interface().backButton.addEventListener('click', () => {
  Interface.showStartPage();
});
new Interface().categoryButton.addEventListener('click', () => {
  if (new Interface().categoryButton.classList.contains('artists-type')) { Interface.showCategories('artists'); } else Interface.showCategories('paintings');
});
new Interface().settingsButton.addEventListener('click', () => {
  Interface.showSettings();
});

new Interface().gameSelector.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.artists-quiz')) Interface.showCategories('artists');
    else Interface.showCategories('paintings');
  });
});
