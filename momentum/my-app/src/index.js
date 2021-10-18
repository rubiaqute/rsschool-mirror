const timeApp = document.querySelector('.time');
const dateApp = document.querySelector('.date');
const greetingApp = document.querySelector('.greeting')
const nameUser = document.querySelector('.name');
const body =document.querySelector('body');
let randomNumber =getRandomNum();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');



function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeApp.textContent = currentTime; 
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
    
}

function showDate(){
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-US', options);
    dateApp.textContent = currentDate;
}

function showGreeting(){
    
    const timeOfDay = getTimeOfDay();

    const greetingText = `Good ${timeOfDay}`;
    greetingApp.textContent = greetingText;

}

function getTimeOfDay()
{
    const date = new Date();
    const hours = date.getHours();
   
    if (hours>5&&hours<12) return "morning";
    if (hours>11 && hours<18) return "afternoon";
    if (hours>17 && hours<24) return "evening";
    if ((hours>0 && hours<6)||hours==0) return "night";

}

function setLocalStorage() {
    localStorage.setItem('name', nameUser.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      nameUser.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage);

  function getRandomNum() {
    return Math.floor(Math.random() * 19 + 1);
  }
function setBg(){
    const bgNum = (randomNumber +1).toString().padStart(2,"0");
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    
    const randomBG = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    console.log(bgNum);
    img.onload = () => {  
    body.style.backgroundImage = randomBG;
    }
}

function getSlideNext(){
    randomNumber = (randomNumber+1+20) % 20;
    setBg();
}
 function getSlidePrev(){
    randomNumber = (randomNumber-1+20) % 20;
    setBg();
 }

setBg();
showTime();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);