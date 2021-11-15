import { createCategoryArtistPage, createCategoryPaintingsPage } from './category_constructor.js';
import {
  showStartPage, showCategories, backButton, categoryButton,
} from './navigation_functions.js';
import Quiz from './quiz.js';

globalThis.results = [];
globalThis.game = document.querySelector('.wrapper');

window.onload = () => {
  createCategoryArtistPage();
  createCategoryPaintingsPage();
};

const gameSelector = document.querySelectorAll('.game-select');
gameSelector.forEach((el) => {
  el.addEventListener('click', (e) => {
    for (let i = 0; i < 24; i += 1) {
      if (globalThis.results[i]) {
        new Quiz(i).updateCategory();
      }
    }
    if (e.target.closest('.artists-quiz')) showCategories('artists');
    else showCategories('paintings');
  });
});

backButton.addEventListener('click', () => { showStartPage(); });
categoryButton.addEventListener('click', () => {
  if (categoryButton.classList.contains('artists-type')) showCategories('artists');
  else showCategories('paintings');
});

function setLocalStorage() {
  localStorage.setItem('object', JSON.stringify(globalThis.results));
}

function getLocalStorage() {
  if (localStorage.getItem('object')) {
    globalThis.results = JSON.parse(localStorage.getItem('object'));
    console.log(globalThis.results);
  } else globalThis.results = [];
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
