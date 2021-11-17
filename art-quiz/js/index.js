import Category from './category_constructor.js';
import {
  Interface, backButton, categoryButton, settingsButton, switchers, range, musicSelection,
} from './navigation_functions.js';
import Quiz from './quiz.js';
import Results from './results_page.js';
import Settings from './settings.js';

window.onload = () => {
  new Category('', 0).createCategoryPage('artists');
  new Category('', 12).createCategoryPage('paintings');
};

const gameSelector = document.querySelectorAll('.game-select');
gameSelector.forEach((el) => {
  el.addEventListener('click', (e) => {
    for (let i = 0; i < 24; i += 1) {
      if (new Results(i).checkResults()) {
        new Quiz(i).updateCategory();
      }
    }
    if (e.target.closest('.artists-quiz')) Interface.showCategories('artists');
    else Interface.showCategories('paintings');
  });
});

backButton.addEventListener('click', () => { Interface.showStartPage(); });
categoryButton.addEventListener('click', () => {
  if (categoryButton.classList.contains('artists-type')) Interface.showCategories('artists');
  else Interface.showCategories('paintings');
});
settingsButton.addEventListener('click', () => {
  Interface.showSettings();
});
switchers.forEach((button, index) => button.addEventListener('click', (e) => {
  e.preventDefault();
  Settings.switchSettings(button, index);
}));

range.forEach((el, index) => el.addEventListener('change', () => Settings.changeVolume(el, index)));
musicSelection.addEventListener('change', () => Settings.playMusic());

function getLocalStorage() {
  if (localStorage.getItem('resultsRubiaqute')) {
    const results = JSON.parse(localStorage.getItem('resultsRubiaqute'));
    Results.rewriteResults(results);
  }
  if (localStorage.getItem('settingsRubiaqute')) {
    console.log(localStorage.getItem('settingsRubiaqute'));
    const settings = JSON.parse(localStorage.getItem('settingsRubiaqute'));
    Settings.rewriteSettings(settings);
  } else Settings.rewriteSettings(Settings.returnDefaultSettings());
  switchers.forEach((button, index) => Settings.updateSettingsInterface(button, index));
  range.forEach((el, index) => Settings.updateRanges(index));
  Settings.updateTrack();
  console.log(Settings.returnSettings());
}

window.addEventListener('load', () => getLocalStorage());
document.addEventListener('click', () => Settings.playMusic(), { once: true });
