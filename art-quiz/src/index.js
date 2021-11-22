import Category from './js/categories.js';
import Quiz from './js/quiz.js';
import Results from './js/results.js';
import Settings from './js/settings.js';
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
  console.log(new Settings().returnSettings());
}
window.onload = async () => {
  await getSettingsfromLocalStorage();
  document.addEventListener('click', () => Settings.playMusic(), { once: true });
};

window.addEventListener('load', async () => {
  new Category('', 0).createCategoryPage('artists');
  new Category('', 12).createCategoryPage('paintings');
  for (let i = 0; i < 24; i += 1) {
    if (new Results(i).checkResults()) {
      new Quiz(i).updateCategory();
    }
  }
});

// document.addEventListener('click', () => Settings.playMusic(), { once: true });
