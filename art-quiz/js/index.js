import Category from './category_constructor.js';
import {
  Interface, backButton, categoryButton, settingsButton,
} from './navigation_functions.js';
import Quiz from './quiz.js';
import Results from './results_page.js';

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

function getLocalStorage() {
  if (localStorage.getItem('results')) {
    const results = JSON.parse(localStorage.getItem('results'));
    Results.rewriteResults(results);
  }
  console.log(Results.returnResults());
}

window.addEventListener('load', () => getLocalStorage());
