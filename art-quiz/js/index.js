import Category from './categories.js';
import Quiz from './quiz.js';
import Results from './results.js';
import Settings from './settings.js';

async function getLocalStorage() {
  if (localStorage.getItem('settingsRubiaqute')) {
    const settings = JSON.parse(localStorage.getItem('settingsRubiaqute'));
    await Settings.rewriteSettings(settings);
  } else {
    await Settings.rewriteSettings(new Settings().settingsDefault);
    Settings.setSettingstoLocalStorage();
  }
  Settings.updateSettingsPage();
  console.log(Settings.returnSettings());
}
window.onload = () => {
  getLocalStorage();
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
document.addEventListener('click', () => Settings.playMusic(), { once: true });
