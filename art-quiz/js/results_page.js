import {
  createNodetoDom, getImageSrc, getAuthor, getName, getYear, createModalWrapper,
} from './base_functions.js';
import { Interface } from './navigation_functions.js';

export default class Results {
  constructor(indexCategory) {
    this.index = indexCategory;
  }

  makeResultsPage() {
    const resultsContainer = createNodetoDom('div', 'container-results');
    let template = '';
    const score = globalThis.results[this.index].filter((el) => el === 'right').length;
    template += `<div class="results-header"><h5>Round ${this.index + 1}</h5><p class="results-header_score">Your score: ${score}/10</p></div>`;
    template += '<div class="images-results">';
    for (let i = 0; i < 10; i += 1) {
      const imageSrc = getImageSrc(this.index * 10 + i);
      let imageClass;
      if (globalThis.results[this.index][i] === 'right') imageClass = 'colored';
      else imageClass = 'black-white';
      template += `<div class="image-results ${imageClass}"><img class="${imageClass}" alt="" src =${imageSrc}></div>`;
    }
    template += '</div>';
    resultsContainer.innerHTML = template;
    globalThis.game.append(resultsContainer);
    const imageResults = document.querySelectorAll('.image-results');
    imageResults.forEach((el, id) => el.addEventListener('click', () => {
      new Results(this.index).makePictureModal(id);
    }));
  }

  async makePictureModal(id) {
    let template = '';
    const imageSrc = getImageSrc(this.index * 10 + id);
    const author = await getAuthor(this.index * 10 + id);
    const name = await getName(this.index * 10 + id);
    const year = await getYear(this.index * 10 + id);
    template += `<img class="image-answer big"src="${imageSrc}" alt="">`;
    template += '<div class="container-description">';
    template += `<p class="description">${author}</p>`;
    template += `<p class="description">"${name}"</p>`;
    template += `<p class="description">${year}</p>`;
    template += '</div>';
    template += '<button class="next-question">Close</button>';
    createModalWrapper(template);
    const closeButton = document.querySelector('.next-question');
    closeButton.addEventListener('click', () => Interface.eliminateModal());
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('mousedown', ((e) => {
      if (e.target.closest('.modal-container') === null) Interface.eliminateModal();
    }));
  }
}
