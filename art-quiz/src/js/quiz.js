import Interface from './interface.js';
import Questions from './questions.js';
import Results from './results.js';
import Settings from './settings.js';
import translation from './translation.js';

const preResults = [];
let containerQuestion;

export default class Quiz {
  constructor(index) {
    this.index = index;
  }

  async createQuiz() {
    preResults[this.index] = [];
    const indexCategory = this.index;
    const indexQuestion = this.index * 10;
    Interface.showQuestion(this.index);
    Quiz.createQuestionContainer();
    const questionText = Interface.createNodetoDom('h4', 'text-question');
    questionText.innerText = await new Questions(indexQuestion).makeQuestion();
    containerQuestion.append(questionText);
    const imageOptionsContainer = Interface.createNodetoDom(
      'div',
      'container-question-image',
    );
    containerQuestion.append(imageOptionsContainer);
    if (indexCategory < 12) {
      const questionImage = new Image();
      questionImage.src = new Questions(indexQuestion).getImageSrc();
      questionImage.alt = '';
      await questionImage.decode();
      imageOptionsContainer.append(questionImage);
      questionImage.className = 'image-question';
      setTimeout(() => questionImage.classList.add('loaded'), 1000);
    }
    const containerOptions = Interface.createNodetoDom('div', 'container-options');
    imageOptionsContainer.append(containerOptions);
    const options = await new Questions(indexQuestion).makeOptions();
    for (let i = 0; i < 4; i += 1) {
      const questionOption = Interface.createNodetoDom('div', 'options');
      if (indexCategory < 12) questionOption.innerText = options[i];
      else {
        const img = new Image();
        img.src = `${options[i]}`;
        img.alt = '';
        img.onload = () => {
          questionOption.append(img);
          questionOption.classList.add('image-type-options');
        };
      }
      containerOptions.append(questionOption);
    }
    containerOptions.addEventListener('click', async (e) => {
      e.preventDefault();
      await new Quiz(this.index).checkAnswer(e, indexQuestion);
      Quiz.killTimer();
    }, { once: true });
    if (new Settings().returnSettings()['time-mode'] === 'true') { new Quiz(indexCategory).createTimer(indexQuestion); }
    const gettedOptions = document.querySelectorAll('.options');
    setTimeout(() => {
      gettedOptions.forEach((item) => {
        item.classList.add('loaded');
      });
    }, 500);
  }

  async checkAnswer(e, id) {
    if (this.index > 11) {
      if (e.target.src) {
        if (+/\d{1,3}.jpg/.exec(e.target.src)[0].slice(0, -4) === id) {
          await new Quiz(this.index).informIsRight(e, id, 'right');
        } else await new Quiz(this.index).informIsRight(e, id, 'wrong');
      }
    } else {
      const rightAnswer = await new Questions(id).getRightAnswer();
      if (e.target.innerText === rightAnswer) { await new Quiz(this.index).informIsRight(e, id, 'right'); } else await new Quiz(this.index).informIsRight(e, id, 'wrong');
    }
  }

  async informIsRight(e, id, type) {
    preResults[this.index].push(type);
    Quiz.colorAnswer(e.target, type);
    new Quiz(this.index).colorBullet(id, type);
    await Quiz.playSoundEffect(type);
    new Quiz(this.index).appearModal(type, id);
    Quiz.deleteOptions();
  }

  async informIsRightByTimer(id, type) {
    preResults[this.index].push(type);
    new Quiz(this.index).colorBullet(id, type);
    await Quiz.playSoundEffect(type);
    new Quiz(this.index).appearModal(type, id);
    Quiz.deleteOptions();
  }

  appearModal(type, id) {
    setTimeout(() => {
      new Quiz(this.index).makeRightAnswerModal(id, type);
    }, 0);
  }

  async getNextQuestion(id) {
    const index = id + 1;
    Interface.eliminateModal();
    if (index - this.index * 10 === 10) {
      new Quiz(this.index).makeFinalModal();
    } else {
      Quiz.createOptions();
      Quiz.changeQuestion(index);
      Quiz.changeImage(index);
      await new Quiz(this.index).changeOptions(index);
      if (new Settings().returnSettings()['time-mode'] === 'true') { new Quiz(this.index).createTimer(index); }
    }
  }

  async changeOptions(id) {
    const options = await new Questions(id).makeOptions();
    const questionOptions = document.querySelectorAll('.options');
    const containerOptions = document.querySelector('.container-options');
    for (let i = 0; i < 4; i += 1) {
      if (this.index < 12) questionOptions.item(i).innerText = options[i];
      else {
        const img = new Image();
        img.src = `${options[i]}`;
        img.alt = '';
        img.onload = () => {
          questionOptions.item(i).append(img);
          questionOptions.item(i).classList.add('image-type-options');
        };
      }
    }
    containerOptions.addEventListener('click', async (e) => {
      await new Quiz(this.index).checkAnswer(e, id);
      Quiz.killTimer();
    }, { once: true });
    setTimeout(() => {
      questionOptions.forEach((item) => {
        item.classList.add('loaded');
      });
    }, 500);
  }

  colorBullet(i, type) {
    const bullets = document.querySelectorAll('.bullet');
    const index = i - this.index * 10;
    bullets.item(index).classList.add(type);
  }

  static colorAnswer(target, type) {
    target.classList.add(type);
    setTimeout(() => {
      target.classList.remove(type);
    }, 1000);
  }

  static deleteOptions() {
    // const questionOptions = document.querySelectorAll('.options');
    const containerOptions = document.querySelector('.container-options');
    const containerImageQuestion = document.querySelector('.container-question-image');
    containerImageQuestion.removeChild(containerOptions);
  }

  static createOptions() {
    const containerOptions = Interface.createNodetoDom('div', 'container-options');
    for (let i = 0; i < 4; i += 1) {
      const questionOptions = Interface.createNodetoDom('div', 'options');
      containerOptions.append(questionOptions);
    }
    const containerImageQuestion = document.querySelector('.container-question-image');
    containerImageQuestion.append(containerOptions);
  }

  static async changeQuestion(id) {
    const questionText = document.querySelector('.text-question');
    questionText.innerText = await new Questions(id).makeQuestion();
  }

  static changeImage(id) {
    if (id < 120) {
      const questionImage = document.querySelector('.image-question');
      questionImage.classList.remove('loaded');
      questionImage.src = new Questions(id).getImageSrc();
      questionImage.onload = () => {
        questionImage.classList.add('loaded');
      };
    }
  }

  static createQuestionContainer() {
    containerQuestion = Interface.createNodetoDom('div', 'container-question');
    new Interface().game.append(containerQuestion);
    const containerBullets = Interface.createNodetoDom('div', 'bullets');
    for (let i = 0; i < 10; i += 1) {
      const bullet = Interface.createNodetoDom('div', 'bullet');
      containerBullets.append(bullet);
    }
    containerQuestion.append(containerBullets);
  }

  static async playSoundEffect(type) {
    if (new Settings().returnSettings()['sound-mode'] === 'true') {
      const audio = document.querySelector('.audio-sound');
      audio.src = `./assets/sounds/${type}.mp3`;
      audio.volume = new Settings().range[0].value / 100;
      await audio.play();
      audio.removeAttribute('src');
    }
  }

  static setResultsToLocalStorage() {
    const results = Results.returnResults();
    localStorage.setItem('resultsRubiaqute', JSON.stringify(results));
  }

  writeResult() {
    if (preResults[this.index].length === 10) {
      new Results(this.index).changeResults(preResults[this.index]);
    }
    Quiz.setResultsToLocalStorage();
  }

  async countTimer(seconds, id) {
    const timer = document.querySelector('.timer');
    let secondsLeft = seconds;
    let timerBlock;
    const timerPlay = () => {
      timerBlock = setInterval(async () => {
        if (!document.querySelector('.timer')) clearInterval(timerBlock);
        else {
          secondsLeft -= 1;
          if (secondsLeft < 0) {
            clearInterval(timerBlock);
            await new Quiz(this.index).informIsRightByTimer(id, 'wrong');
            Quiz.killTimer();
          } else if (secondsLeft < 10) {
            timer.innerText = `00:0${secondsLeft}`;
          } else timer.innerText = `00:${secondsLeft}`;
        }
      }, 1000);
    };
    timerPlay();
  }

  static killTimer() {
    const timer = document.querySelector('.timer');
    if (timer) containerQuestion.removeChild(timer);
  }

  createTimer(indexQuestion) {
    const timer = Interface.createNodetoDom('span', 'timer');
    containerQuestion.append(timer);
    const timeLeft = new Settings().returnSettings()['time-left'];
    new Quiz(this.index).countTimer(timeLeft, indexQuestion);
  }

  async makeRightAnswerModal(id, type) {
    let template = '';
    const imageSrc = new Questions(id).getImageSrc();
    const author = await new Questions(id).getAuthor();
    const name = await new Questions(id).getName();
    const year = await new Questions(id).getYear();
    const containerAnswer = Interface.createNodetoDom('div', 'container-answer');
    const imageAnswer = new Image();
    imageAnswer.src = `${imageSrc}`;
    imageAnswer.alt = '';
    await imageAnswer.decode();
    containerAnswer.append(imageAnswer);
    imageAnswer.className = 'image-answer';
    template += '<div class="container-description">';
    template += `<p class="description">${author}</p>`;
    template += `<p class="description">"${name}"</p>`;
    template += `<p class="description">${year}</p>`;
    template += '</div>';
    containerAnswer.insertAdjacentHTML('beforeend', template);
    const modalPage = await Interface.createModalWrapper();
    modalPage.append(containerAnswer);
    modalPage.insertAdjacentHTML('afterbegin', `<div class="icon-${type}"></div>`);
    if (type === 'wrong') modalPage.insertAdjacentHTML('beforeend', `<p class="note">${translation[3][new Settings().returnSettings()['language-key']]}!</p>`);
    else modalPage.insertAdjacentHTML('beforeend', `<p class="note">${translation[4][new Settings().returnSettings()['language-key']]}!</p>`);
    modalPage.insertAdjacentHTML('beforeend', `<button class="next-question">${translation[5][new Settings().returnSettings()['language-key']]}</button>`);
    const nextButton = document.querySelector('.next-question');
    nextButton.addEventListener('click', () => new Quiz(this.index).getNextQuestion(id));
  }

  replayLevel() {
    Interface.eliminateModal();
    Interface.eliminateQuizPage();
    new Quiz(this.index).writeResult();
    new Quiz(this.index).updateCategory();
    new Quiz(this.index).createQuiz();
  }

  finishLevel() {
    Interface.eliminateModal();
    if (this.index > 11) Interface.showCategories('paintings');
    else Interface.showCategories('artists');
    new Quiz(this.index).writeResult();
    new Quiz(this.index).updateCategory();
  }

  updateCategory() {
    const categories = document.querySelectorAll('.category');
    const category = categories.item(this.index);
    const categoryNumber = Interface.createNodetoDom('div', 'number');
    if (this.index < 12) categoryNumber.innerText = this.index + 1;
    else categoryNumber.innerText = this.index + 1 - 12;
    const categoryImage = category.querySelector('.category-image');
    categoryImage.classList.remove('not-colored');
    if (category.querySelector('div', 'score')) { category.removeChild(category.querySelector('div', 'score')); }
    const categoryResult = Interface.createNodetoDom('div', 'score');
    const score = new Results(this.index)
      .checkResults()
      .filter((el) => el === 'right').length;
    if (score === 10) categoryResult.classList.add('best-score');
    categoryResult.innerHTML = `<p>${score}/10</p><p>${translation[6][new Settings().returnSettings()['language-key']]}<p>`;
    category.append(categoryResult, categoryNumber);
    categoryResult.addEventListener('click', () => {
      Interface.showQuestion(this.index);
      new Results(this.index).makeResultsPage();
    });
  }

  async makeFinalModal() {
    let template = '';
    const modalPage = await Interface.createModalWrapper();
    const rightBullets = document.querySelectorAll('.bullet.right');
    const score = rightBullets.length;
    modalPage.insertAdjacentHTML('beforeend', `<p class="note">${translation[7][new Settings().returnSettings()['language-key']]}: <span>${score}/10</span></p>`);
    const finalImage = new Image();
    finalImage.alt = '';
    if (score === 10) {
      finalImage.src = './assets/image-data/younglady.jpg';
      template += `<p class="note-result">${translation[8][new Settings().returnSettings()['language-key']]}!</p>`;
      await Quiz.playSoundEffect('finish-right');
    } else {
      finalImage.src = './assets/image-data/oldlady.jpg';
      template += `<p class="note-result">${translation[9][new Settings().returnSettings()['language-key']]}...</p>`;
      await Quiz.playSoundEffect('finish-wrong');
    }
    template
      += `<button class="final-modal-button play-again">&#8634; ${translation[10][new Settings().returnSettings()['language-key']]}</button>`;
    template += `<button class="final-modal-button resume">${translation[11][new Settings().returnSettings()['language-key']]}</button>`;
    await finalImage.decode();
    modalPage.append(finalImage);
    finalImage.className = 'image-result';
    modalPage.insertAdjacentHTML('beforeend', template);
    const playAgainButton = document.querySelector('.play-again');
    playAgainButton.addEventListener('click', () => new Quiz(this.index).replayLevel());
    const resumeButton = document.querySelector('.resume');
    resumeButton.addEventListener('click', () => new Quiz(this.index).finishLevel());
  }
}
