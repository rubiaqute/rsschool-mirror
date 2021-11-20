import {
  getAuthor, getName, getYear, createModalWrapper, createNodetoDom, getImageSrc,
} from './base_functions.js';
import { Interface, game, range } from './navigation_functions.js';
import Questions from './questions.js';
import Results from './results_page.js';
import Settings from './settings.js';

const preResults = [];
let containerQuestion;

function setResultsToLocalStorage() {
  const results = Results.returnResults();
  localStorage.setItem('resultsRubiaqute', JSON.stringify(results));
}
function writeResult(index) {
  if (preResults[index].length === 10) {
    new Results(index).changeResults(preResults[index]);
  }
  setResultsToLocalStorage();
}
function playSoundEffect(type) {
  if (Settings.returnSettings()[0] === 'true') {
    const audio = document.querySelector('.audio-sound');
    audio.src = `./sounds/${type}.mp3`;
    audio.volume = range[0].value / 100;
    audio.play();
  }
}

function colorBullet(i, type, indexCategory) {
  const bullets = document.querySelectorAll('.bullet');
  const index = i - indexCategory * 10;
  bullets.item(index).classList.add(type);
}
function colorAnswer(target, type) {
  target.classList.add(type);
  setTimeout(() => {
    target.classList.remove(type);
  }, 1000);
}

function deleteOptions() {
  const questionOptions = document.querySelectorAll('.options');
  const containerOptions = document.querySelector('.container-options');
  questionOptions.forEach((el) => containerOptions.removeChild(el));
}
function createOptions() {
  const containerOptions = document.querySelector('.container-options');
  for (let i = 0; i < 4; i += 1) {
    const questionOptions = createNodetoDom('div', 'options');
    containerOptions.append(questionOptions);
  }
}
async function changeQuestion(id) {
  const questionText = document.querySelector('.text-question');
  questionText.innerText = await new Questions(id).makeQuestion();
}
function changeImage(id) {
  if (id < 120) {
    const questionImage = document.querySelector('.image-question');
    questionImage.classList.remove('loaded');
    questionImage.src = getImageSrc(id);
    questionImage.onload = () => {
      questionImage.classList.add('loaded');
    };
  }
}

function createQuestionContainer() {
  containerQuestion = createNodetoDom('div', 'container-question');
  game.append(containerQuestion);
  const containerBullets = createNodetoDom('div', 'bullets');
  for (let i = 0; i < 10; i += 1) {
    const bullet = createNodetoDom('div', 'bullet');
    containerBullets.append(bullet);
  }
  containerQuestion.append(containerBullets);
}

export default class Quiz {
  constructor(index) {
    this.index = index;
  }

  countTimer(seconds, id) {
    const timer = document.querySelector('.timer');
    let secondsLeft = seconds;
    let timerBlock;
    const timerPlay = () => {
      timerBlock = setInterval(() => {
        if (!document.querySelector('.timer')) clearInterval(timerBlock);
        else {
          secondsLeft -= 1;
          if (secondsLeft <= 0) {
            clearInterval(timerBlock);
            new Quiz(this.index).informIsRightByTimer(id, 'wrong');
            Quiz.killTimer();
          }
          if (secondsLeft < 10) {
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
    const timer = createNodetoDom('span', 'timer');
    containerQuestion.append(timer);
    const timeLeft = +Settings.returnSettings()[6];
    new Quiz(this.index).countTimer(timeLeft, indexQuestion);
  }

  async createQuiz() {
    preResults[this.index] = [];
    const indexCategory = this.index;
    const indexQuestion = this.index * 10;
    Interface.showQuestion(this.index);
    createQuestionContainer();
    if (Settings.returnSettings()[2] === 'true') new Quiz(indexCategory).createTimer(indexQuestion);
    const questionText = createNodetoDom('h4', 'text-question');
    questionText.innerText = await new Questions(indexQuestion).makeQuestion();
    containerQuestion.append(questionText);
    const imageOptionsContainer = createNodetoDom('div', 'container-question-image');
    containerQuestion.append(imageOptionsContainer);
    if (indexCategory < 12) {
      const questionImage = new Image();
      questionImage.src = getImageSrc(indexQuestion);
      questionImage.alt = '';
      await questionImage.decode();
      // questionImage.onload = () => {
      //   containerQuestion.append(questionImage);
      // };
      imageOptionsContainer.append(questionImage);
      questionImage.className = 'image-question';
      setTimeout(() => questionImage.classList.add('loaded'), 1000);
    }
    const containerOptions = createNodetoDom('div', 'container-options');
    imageOptionsContainer.append(containerOptions);
    const options = await new Questions(indexQuestion).makeOptions();
    for (let i = 0; i < 4; i += 1) {
      const questionOption = createNodetoDom('div', 'options');
      if (indexCategory < 12) questionOption.innerText = options[i];
      else {
        const img = new Image();
        img.src = `${options[i]}`;
        img.alt = '';
        img.onload = () => {
          questionOption.append(img);
        };
        questionOption.classList.add('image-type-options');
      }
      containerOptions.append(questionOption);
      questionOption.addEventListener('click', (e) => {
        new Quiz(this.index).checkAnswer(e, indexQuestion);
        Quiz.killTimer();
      });
    }
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
          new Quiz(this.index).informIsRight(e, id, 'right');
        } else new Quiz(this.index).informIsRight(e, id, 'wrong');
      }
    } else {
      const rightAnswer = await new Questions(id).getRightAnswer();
      if (e.target.innerText === rightAnswer) new Quiz(this.index).informIsRight(e, id, 'right');
      else new Quiz(this.index).informIsRight(e, id, 'wrong');
    }
  }

  informIsRight(e, id, type) {
    preResults[this.index].push(type);
    colorAnswer(e.target, type);
    colorBullet(id, type, this.index);
    playSoundEffect(type);
    new Quiz(this.index).appearModal(type, id);
  }

  informIsRightByTimer(id, type) {
    preResults[this.index].push(type);
    colorBullet(id, type, this.index);
    playSoundEffect(type);
    new Quiz(this.index).appearModal(type, id);
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
      deleteOptions();
      createOptions();
      changeQuestion(index);
      changeImage(index);
      await new Quiz(this.index).changeOptions(index);
      if (Settings.returnSettings()[2] === 'true') new Quiz(this.index).createTimer(index);
    }
  }

  async changeOptions(id) {
    const options = await new Questions(id).makeOptions();
    const questionOptions = document.querySelectorAll('.options');
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
      questionOptions.item(i).addEventListener('click', (e) => {
        new Quiz(this.index).checkAnswer(e, id);
        Quiz.killTimer();
      });
    }
    setTimeout(() => {
      questionOptions.forEach((item) => {
        item.classList.add('loaded');
      });
    }, 500);
  }

  async makeRightAnswerModal(id, type) {
    let template = '';
    template += `<div class="icon-${type}"></div>`;
    const imageSrc = getImageSrc(id);
    const author = await getAuthor(id);
    const name = await getName(id);
    const year = await getYear(id);
    template += '<div class="container-answer">';
    template += `<img class="image-answer"src="${imageSrc}" alt="">`;
    template += '<div class="container-description">';
    template += `<p class="description">${author}</p>`;
    template += `<p class="description">"${name}"</p>`;
    template += `<p class="description">${year}</p>`;
    template += '</div></div>';
    template += `<p class="note">You're ${type}!</p>`;
    template += '<button class="next-question">Next</button>';
    await createModalWrapper(template);
    const nextButton = document.querySelector('.next-question');
    nextButton.addEventListener('click', () => new Quiz(this.index).getNextQuestion(id));
  }

  replayLevel() {
    Interface.eliminateModal();
    Interface.eliminateQuizPage();
    writeResult(this.index);
    new Quiz(this.index).updateCategory();
    new Quiz(this.index).createQuiz();
  }

  finishLevel() {
    Interface.eliminateModal();
    if (this.index > 11) Interface.showCategories('paintings');
    else Interface.showCategories('artists');
    writeResult(this.index);
    new Quiz(this.index).updateCategory();
  }

  updateCategory() {
    const categories = document.querySelectorAll('.category');
    const category = categories.item(this.index);
    const categoryNumber = createNodetoDom('div', 'number');
    if (this.index < 12)categoryNumber.innerText = this.index + 1;
    else categoryNumber.innerText = this.index + 1 - 12;
    const categoryImage = category.querySelector('.category-image');
    categoryImage.classList.remove('not-colored');
    if (category.querySelector('div', 'score')) category.removeChild(category.querySelector('div', 'score'));
    const categoryResult = createNodetoDom('div', 'score');
    const score = new Results(this.index).checkResults().filter((el) => el === 'right').length;
    if (score === 10) categoryResult.classList.add('best-score');
    categoryResult.innerHTML = `<p>${score}/10</p><p>see results<p>`;
    category.append(categoryResult, categoryNumber);
    categoryResult.addEventListener('click', () => {
      Interface.showQuestion(this.index);
      new Results(this.index).makeResultsPage();
    });
  }

  async makeFinalModal() {
    let template = '';
    const rightBullets = document.querySelectorAll('.bullet.right');
    const score = rightBullets.length;
    template += `<p class="note">Your score: <span>${score}/10</span></p>`;
    if (score === 10) {
      template += '<img class="image-result"src="./image-data/younglady.jpg" alt="">';
      template += '<p class="note-result">You are the BEST!</p>';
      playSoundEffect('finish-right');
    } else {
      template += '<img class="image-result"src="./image-data/oldlady.jpg" alt="">';
      template += '<p class="note-result">Try better next time...</p>';
      playSoundEffect('finish-wrong');
    }
    template += '<button class="final-modal-button play-again">&#8634; Once again</button>';
    template += '<button class="final-modal-button resume">Resume</button>';
    await createModalWrapper(template);
    const playAgainButton = document.querySelector('.play-again');
    playAgainButton.addEventListener('click', () => new Quiz(this.index).replayLevel());
    const resumeButton = document.querySelector('.resume');
    resumeButton.addEventListener('click', () => new Quiz(this.index).finishLevel());
  }
}
