export const backButton = document.querySelector('.back');
export const categoryButton = document.querySelector('.categories-icon');

export function appearStartPage() {
  const startPage = document.querySelector('.container');
  startPage.classList.remove('hide');
}
export function hideStartPage() {
  const startPage = document.querySelector('.container');
  startPage.classList.add('hide');
}
export function appearBackIcon() {
  backButton.classList.remove('hide');
}
export function hideBackIcon() {
  backButton.classList.add('hide');
}
export function appearCategories(type) {
  const containerCategory = document.querySelector(`.${type}`);
  containerCategory.classList.remove('hide');
}

export function hideCategories() {
  const containerCategory = document.querySelectorAll('.categories');
  containerCategory.forEach((el) => el.classList.add('hide'));
}
export function appearCategoryIcon(id) {
  categoryButton.classList.remove('hide');
  if (id > 11) categoryButton.classList.add('paintings-type');
  else categoryButton.classList.add('artists-type');
}
export function hideCategoryIcon() {
  categoryButton.classList.add('hide');
  categoryButton.classList.remove('paintings-type', 'artists-type');
}
export function appearQuizPage() {
  const quizPage = document.querySelector('.container-question');
  quizPage.classList.remove('hide');
}
export function eliminateQuizPage() {
  const quizPage = document.querySelector('.container-question');
  if (quizPage) globalThis.game.removeChild(quizPage);
}
export function eliminateResultsPage() {
  const resultsPage = document.querySelector('.container-results');
  if (resultsPage) globalThis.game.removeChild(resultsPage);
}
export function eliminateModal() {
  const overlay = document.querySelector('.overlay');
  if (overlay) globalThis.game.removeChild(overlay);
}
export function showStartPage() {
  appearStartPage();
  hideCategories();
  hideBackIcon();
  hideCategoryIcon();
  eliminateQuizPage();
  eliminateResultsPage();
}
export function showCategories(type) {
  hideStartPage();
  appearCategories(type);
  appearBackIcon();
  hideCategoryIcon();
  eliminateQuizPage();
  eliminateResultsPage();
}
export function showQuestion(id) {
  appearBackIcon();
  appearCategoryIcon(id);
  hideStartPage();
  hideCategories();
}
