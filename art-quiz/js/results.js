import Questions from './questions.js';
import Interface from './interface.js';

export default class Results {
  constructor(indexCategory) {
    this.index = indexCategory;
    this.results = Results.getResultsfromLocalStorage();
  }

  static getResultsfromLocalStorage() {
    let resultsLocalStorage;
    if (localStorage.getItem('resultsRubiaqute')) {
      resultsLocalStorage = JSON.parse(localStorage.getItem('resultsRubiaqute'));
      return Results.rewriteResults(resultsLocalStorage);
    } return Results.rewriteResults([]);
  }

  static cleanResults() {
    localStorage.removeItem('resultsRubiaqute');
    window.location.reload();
  }

  checkResults() {
    if (this.results) return this.results[this.index];
    return null;
  }

  changeResults(array) {
    this.results[this.index] = array;
  }

  static rewriteResults(array) {
    this.results = array;
    return this.results;
  }

  static returnResults() {
    return this.results;
  }

  async makeResultsPage() {
    const resultsContainer = Interface.createNodetoDom('div', 'container-results');
    let template = '';
    const score = this.results[this.index].filter((el) => el === 'right').length;
    if (this.index < 12) {
      template += `<div class="results-header"><h5>Round ${
        this.index + 1
      }</h5><p class="results-header_score">Your score: ${score}/10</p></div>`;
    } else {
      template += `<div class="results-header"><h5>Round ${
        this.index + 1 - 12
      }</h5><p class="results-header_score">Your score: ${score}/10</p></div>`;
    }
    resultsContainer.innerHTML = template;
    const imgContainer = Interface.createNodetoDom('div', 'images-results');
    resultsContainer.append(imgContainer);
    for (let i = 0; i < 10; i += 1) {
      const imageSrc = new Questions(this.index * 10 + i).getImageSrc();
      let imageClass;
      if (this.results[this.index][i] === 'right') imageClass = 'colored';
      else imageClass = 'black-white';
      const imgBordered = Interface.createNodetoDom('div', `image-results ${imageClass}`);
      const img = new Image();
      img.src = imageSrc;
      img.classList.add(`${imageClass}`);
      img.alt = '';
      img.onload = () => {
        imgBordered.append(img);
      };
      imgContainer.append(imgBordered);
    }
    new Interface().game.append(resultsContainer);
    const imageResults = document.querySelectorAll('.image-results');
    setTimeout(() => {
      resultsContainer.classList.add('loaded');
    }, 500);
    imageResults.forEach((el, id) => el.addEventListener('click', () => {
      new Results(this.index).makePictureModal(id);
    }));
  }

  async makePictureModal(id) {
    let template = '';
    const imageSrc = new Questions(this.index * 10 + id).getImageSrc();
    const author = await new Questions(this.index * 10 + id).getAuthor();
    const name = await new Questions(this.index * 10 + id).getName();
    const year = await new Questions(this.index * 10 + id).getYear();
    const modalPage = await Interface.createModalWrapper();
    const imageResultsModal = new Image();
    imageResultsModal.alt = '';
    imageResultsModal.src = `${imageSrc}`;
    await imageResultsModal.decode();
    modalPage.append(imageResultsModal);
    imageResultsModal.className = 'image-answer big';
    template += '<div class="container-description">';
    template += `<p class="description">${author}</p>`;
    template += `<p class="description">"${name}"</p>`;
    template += `<p class="description">${year}</p>`;
    template += '</div>';
    template += '<div class="results-modal_buttons">';
    template += `<a class="next-question results" target="_blank" href="${imageSrc}" download>Download</a>`;
    template += '<button class="next-question results close">Close</button>';
    template += '</div>';
    modalPage.insertAdjacentHTML('beforeend', template);
    const closeButton = document.querySelector('.next-question.results.close');
    closeButton.addEventListener('click', () => Interface.eliminateModal());
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('mousedown', (e) => {
      if (e.target.closest('.modal-container') === null) { Interface.eliminateModal(); }
    });
  }
}
