// import Category from './js/categories.js';
import Questions from './js/questions.js';
import Quiz from './js/quiz.js';
import Results from './js/results.js';
import Settings from './js/settings.js';
import selfEstimation from './js/self-estimation.js';
import initial from './js/constants.js';
import CategoryPage from './js/category-page.js';
import './sass/style.scss';

async function getSettingsfromLocalStorage() {
  if (localStorage.getItem('settingsRubiaqute')) {
    const settings = JSON.parse(localStorage.getItem('settingsRubiaqute'));
    await Settings.rewriteSettings(settings);
  } else {
    await Settings.rewriteSettings(new Settings().settingsDefault);
    Settings.setSettingstoLocalStorage();
  }
  Settings.updateSettingsPage();
}
window.onload = async () => {
  await getSettingsfromLocalStorage();
  document.addEventListener('click', () => Settings.playMusic(), { once: true });
  Settings.translateApplication();
  Questions.preloadImages();
  new CategoryPage('artists').makeCategoryPage();
  new CategoryPage('paintings').makeCategoryPage();
  // new Category('', 0).createCategoryPage('artists');
  // new Category('', 12).createCategoryPage('paintings');
  for (let i = 0; i < initial.quantityOfCategoriesInQuiz * initial.quantityOfQuizes; i += 1) {
    if (new Results(i).checkResults()) {
      new Quiz(i).updateCategory();
    }
  }
  console.log(selfEstimation);
};
