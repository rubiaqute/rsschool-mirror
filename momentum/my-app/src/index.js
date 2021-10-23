import {settingsTranslation, greetingTranslation, weatherTranslation, covidTranslationitems} from './js/translation.js';
import playList from './js/playlist.js';
const tracks= document.querySelectorAll('.track')
tracks[0].classList.add('current-track');
const timeApp = document.querySelector('.time');
const dateApp = document.querySelector('.date');
const greetingApp = document.querySelector('.greeting')
const nameUser = document.querySelector('.name');
const body =document.querySelector('body');
let randomNumber =getRandomNum();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

const cityUser = document.querySelector('.city');
const quoteApp = document.querySelector('.quote');
const authorQuoteApp = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote')
const audio = new Audio();
let languageMode = "EN";
let languageKey = 1;
let sourceKey=0;
let dateMode = 'en-US'
let weatherMode = "lang=en";
let inputErrorMessage = "Wrong tag!"
let unsplashTag;
const inputTag = document.querySelector('.input-tag');


let isPlay = false;
let playNum = 0;
audio.src = playList[playNum].src;

document.querySelector('.song-name').textContent = playList[playNum].title;
document.querySelector('.time-audio .length').textContent = playList[playNum].duration;
const buttonPlay = document.querySelector('.play')
const buttonPlayNext = document.querySelector('.play-next')
const buttonPlayPrev = document.querySelector('.play-prev')
const progressVolume = document.querySelector('.progress-volume')
const volumeToggle = document.querySelector('.volume-button');
const progressTime = document.querySelector('.progress-play')
const buttonSmallPlay = document.querySelectorAll('.small-play')

audio.volume = progressVolume.value / 100;
let sectionNames=[['.weather', "true"], ['.quote-container',"true"], ['.time',"true"], ['.date', "true"], ['.player',"true"], ['.greeting-container', "true"], ['.extra-tools',"true"]];

let quotesAddress = './js/quotesEN.json'


inputTag.addEventListener('change', (e) => changeTag());
function changeTag(){
  if (inputTag.value) {unsplashTag = inputTag.value;
  setBg();
  }
}

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
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(`${dateMode}`, options);
    dateApp.textContent = currentDate;
    
}

function showGreeting(){
    
    const timeOfDay = getTimeOfDay();

    const greetingText = `${timeOfDay}`;
    greetingApp.textContent = greetingText;

}

function getTimeOfDay()
{
    const date = new Date();
    const hours = date.getHours();
   
    if (hours>5&&hours<12) return `${greetingTranslation[0][languageKey]}`;
    if (hours>11 && hours<18) return `${greetingTranslation[1][languageKey]}`;
    if (hours>17 && hours<24) return `${greetingTranslation[2][languageKey]}`;
    if ((hours>0 && hours<6)||hours==0) return `${greetingTranslation[3][languageKey]}`;

}

function setLocalStorage() {
    localStorage.setItem('name', nameUser.value);
    localStorage.setItem('city', cityUser.value);
    for (let i=0;i<sectionNames.length; i++){
      localStorage.setItem(`visibility${i}`, (sectionNames[i][1]))
    }
    localStorage.setItem('language',languageKey);
    localStorage.setItem('imgSource',sourceKey);
    localStorage.setItem('inputtag', unsplashTag);
  }
  

  function getLocalStorage() {
    for (let i=0;i<sectionNames.length; i++){
      if (localStorage.getItem(`visibility${i}`)){
      sectionNames[i][1] = localStorage.getItem(`visibility${i}`)}
      
    
    checkVisibility();
    };
console.log(sectionNames)
    if(localStorage.getItem('name')) {
      nameUser.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
      cityUser.value = localStorage.getItem('city');
      getWeather();
    } else{
      if (languageKey ==0) cityUser.value = "Минск";
      if (languageKey ==1) cityUser.value = "Minsk";
      if (languageKey ==2) cityUser.value = "Minsk";
         
         getWeather();
    }
      if(localStorage.getItem('language')) {
        tagLanguage[languageKey].classList.remove('active');
        languageKey = localStorage.getItem('language');
        switchLanguage(languageKey);
      }
      
      if(localStorage.getItem('inputtag')) {
        
        unsplashTag = localStorage.getItem('inputtag');
        
      }
      if(localStorage.getItem('imgSource')) {
        imgSourceTags[sourceKey].classList.remove('active');
        sourceKey = localStorage.getItem('imgSource');
        switchImgSource(sourceKey);
      }
    }
  

function checkVisibility(){
  for (let i=0; i<sectionNames.length; i++){
    
    if (sectionNames[i][1]=="true"){
      switchButtons[i].classList.add('switch-on');
      const section = document.querySelector(`${sectionNames[i][0]}`);
      section.classList.remove('hidden');
    } else{
      switchButtons[i].classList.remove('switch-on');
      const section = document.querySelector(`${sectionNames[i][0]}`);
      section.classList.add('hidden');
    }
  }
  console.log(sectionNames)
}

  function getRandomNum() {
    return Math.floor(Math.random() * 19 + 1);
  }
function setBg(){
  
  if (sourceKey==0) setGithubImage();
  if (sourceKey==1) setFlickrImage();
  if (sourceKey==2) setUnsplashImage();
  console.log(unsplashTag)
    
}
function setGithubImage(){
const bgNum = (randomNumber +1).toString().padStart(2,"0");
    const timeOfDay = getFolderName();
    const img = new Image();
    const randomBG = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {  
    body.style.backgroundImage = randomBG;
    }
}
async function setUnsplashImage() {
  if (unsplashTag==undefined) unsplashTag = getFolderName();
  const url = `https://api.unsplash.com/photos/random?query=${unsplashTag}&client_id=-LHVbAfsjEtQYmM1CEAmYotn-NEMWw2YpUls9nUaeuA`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.urls==undefined) {
    document.querySelector('.error').textContent = `${inputErrorMessage}`;
    setTimeout(()=>{
      document.querySelector('.error').textContent ="";
    }, 2000)
    
    return;
    
  }
  const link = await data.urls.regular;
  const img = new Image();
  img.src =  `${link}`;
  console.log(img.src)
  img.onload = () => {  
      
    body.style.backgroundImage = `url('${img.src}')`;
    
 }
}
async function setFlickrImage() {
  if (unsplashTag==undefined) unsplashTag = getFolderName();
const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b0e62b31d36361714f3a06d8297328d&tags=${unsplashTag}&extras=url_l&format=json&nojsoncallback=1`;
const res = await fetch(url);
const data = await res.json();
const imgNumber = Math.floor(Math.random() * data.photos.photo.length);
if (data.photos.photo.length==0) {
  document.querySelector('.error').textContent = `${inputErrorMessage}`;
  setTimeout(()=>{
    document.querySelector('.error').textContent ="";
  }, 2000)
  
  return;
}
const link = await data.photos.photo[imgNumber].url_l;
console.log(link);
const img = new Image();
img.src =  `${link}`;

img.onload = () => {  
      
body.style.backgroundImage = `url('${img.src}')`;
    
}
}
function getFolderName(){
  const date = new Date();
  const hours = date.getHours();
 
  if (hours>5&&hours<12) return `morning`;
  if (hours>11 && hours<18) return `afternoon`;
  if (hours>17 && hours<24) return `evening`;
  if ((hours>0 && hours<6)||hours==0) return `night`;
}

function getSlideNext(){
    randomNumber = (randomNumber+1+20) % 20;
    setBg();
}
 function getSlidePrev(){
    randomNumber = (randomNumber-1+20) % 20;
    setBg();
 }

 async function getWeather() {  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const windSpeed = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity')
  const weatherDescription = document.querySelector('.weather-description');
  const weatherError = document.querySelector('.weather-error');
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityUser.value}&${weatherMode}&appid=e57257892292e552c0054a48a736b278&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `${weatherTranslation[0][languageKey]}: ${Math.round(data.wind.speed)} ${weatherTranslation[1][languageKey]}`;
        humidity.textContent = `${weatherTranslation[2][languageKey]}: ${Math.round(data.main.humidity)}%`;
      } catch(err) {
        weatherError.textContent = `${weatherTranslation[3][languageKey]} '${cityUser.value}'!`;
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        windSpeed.textContent = ``;
        humidity.textContent = '';
      }
  }
  

  async function getQuotes() {  
    const quotes = quotesAddress;
    const res = await fetch(quotes);
    const data = await res.json(); 
    const pickQuote = Math.floor(Math.random() * data.quotes.length);
    quoteApp.textContent = data.quotes[pickQuote].quote;
    authorQuoteApp.textContent = data.quotes[pickQuote].author;
  }
  
    
  function playAudio() {
    
    if(!isPlay){
      console.log(audio.src);
    audio.play();
    isPlay = true;
    
    } else{
      audio.pause();
      isPlay = false;
    }
    
  }
  
  function toggleBtn() {
    buttonPlay.classList.toggle('pause');
    buttonSmallPlay[playNum].classList.toggle('paused');
    playAudio();
  }
  
  
  
  function toggleSmallPlay(i){
  if (i!=playNum) {
    buttonSmallPlay[playNum].classList.remove('paused');
    tracks[playNum].classList.remove('current-track');
    playNum = i;
    tracks[playNum].classList.add('current-track');
    audio.src = playList[playNum].src;
    document.querySelector('.song-name').textContent = playList[playNum].title;
    buttonSmallPlay[playNum].classList.add('paused');
    buttonPlay.classList.add('pause');
    
      isPlay = false;
      playAudio();
    
    
    
  } else{
    buttonSmallPlay[playNum].classList.toggle('paused');
    buttonPlay.classList.toggle('pause');
    playAudio();
  }
  
    
  
  
  
  
  }
  
  function getPlaylistNumberNext(){
    tracks[playNum].classList.remove('current-track');
    buttonSmallPlay[playNum].classList.remove('paused');
    playNum = (playNum+1+playList.length)%playList.length;
    tracks[playNum].classList.add('current-track');
    
    audio.src = playList[playNum].src;
    document.querySelector('.song-name').textContent = playList[playNum].title;
    if (isPlay) {
      isPlay = false;
      buttonSmallPlay[playNum].classList.add('paused');
      playAudio();
    }
    
  }
  function getPlaylistNumberPrev(){
    tracks[playNum].classList.remove('current-track');
    buttonSmallPlay[playNum].classList.remove('paused');
    playNum = (playNum-1+playList.length)%playList.length;
    tracks[playNum].classList.add('current-track');
    audio.src = playList[playNum].src;
    document.querySelector('.song-name').textContent = playList[playNum].title;
    if (isPlay) {
      isPlay = false;
      buttonSmallPlay[playNum].classList.add('paused');
      playAudio();
    }
  }
  function handleVolumeRangeUpdate(){
  if (progressVolume.value == 0){
  volumeToggle.classList.add('mute');
      
  } else {
  volumeToggle.classList.remove('mute');

 }

      const valueProgress = progressVolume.value;
      audio.volume = progressVolume.value / 100;
  }
  function toggleVolume(){
    if (progressVolume.value == 0) progressVolume.value =40;
       else progressVolume.value = 0
    handleVolumeRangeUpdate();
  }
  function scrub(e){
    const scrubTime = (e.offsetX / progressTime.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
}

function handleProgressRangeUpdate(){
  const percent= Math.ceil((audio.currentTime / audio.duration) *100);
  document.querySelector(".time-audio .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
  if (percent){
  progressTime.value=percent;
  } else progressTime.value = 0;
  }

  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
setBg();
showTime();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
cityUser.addEventListener('change', getWeather);
window.addEventListener('load', getQuotes);
changeQuoteButton.addEventListener('click', getQuotes);
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage);
buttonPlay.addEventListener('click', toggleBtn);
buttonPlayNext.addEventListener('click', getPlaylistNumberNext)
buttonPlayPrev.addEventListener('click', getPlaylistNumberPrev)
audio.addEventListener('ended',getPlaylistNumberNext)
progressVolume.addEventListener('change',handleVolumeRangeUpdate);
progressVolume.addEventListener('mousemove',handleVolumeRangeUpdate);
volumeToggle.addEventListener('click', toggleVolume);
let mousedown = false;
progressTime.addEventListener('click', scrub);
progressTime.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressTime.addEventListener('mousedown', () => mousedown=true);
progressTime.addEventListener('mouseup', () => mousedown=false);
audio.addEventListener('timeupdate', handleProgressRangeUpdate);
for (let i=0; i< buttonSmallPlay.length; i++){
  buttonSmallPlay[i].addEventListener('click', (e)=>toggleSmallPlay(i));
}

audio.addEventListener("loadeddata", () => {
    document.querySelector(".time-audio .length").textContent = getTimeCodeFromNum(audio.duration);
  },
  false
);

const settingsPanel = document.querySelector('.settings');
const settingsButton = document.querySelector('.settings-icon')

settingsButton.addEventListener('click', toggleSettings);
function toggleSettings(){
  settingsPanel.classList.toggle('active');
}

const switchButtons = document.querySelectorAll('.switch-btn');
for (let i=0; i< switchButtons.length; i++){
  switchButtons[i].addEventListener('click', (e)=>switchVisibility(i));
}
document.addEventListener('mousedown', function(e){
  if(e.target.closest('.settings') === null&&e.target.classList!='settings-icon'){
    settingsPanel.classList.remove('active');
  }
});
function switchVisibility(i){
  switchButtons[i].classList.toggle('switch-on');
  let hiddenSection = document.querySelector(`${sectionNames[i][0]}`);
  if (sectionNames[i][1]=="true") sectionNames[i][1]="false";
  else sectionNames[i][1]="true";
  hiddenSection.classList.toggle('hidden')
  console.log(sectionNames)
}
const tagLanguage = document.querySelectorAll('.language');
for (let i=0; i<tagLanguage.length; i++){
  tagLanguage[i].addEventListener('click', (e) => switchLanguage(i));
}
const imgSourceTags = document.querySelectorAll('.img-source');
for (let i=0; i<imgSourceTags.length; i++){
  imgSourceTags[i].addEventListener('click', (e) => switchImgSource(i));
}

function switchImgSource(i){
imgSourceTags[sourceKey].classList.remove('active');
sourceKey=i;
imgSourceTags[sourceKey].classList.add('active');
setBg();
}

function switchLanguage(i){
tagLanguage[languageKey].classList.remove('active');
languageKey=i;
tagLanguage[languageKey].classList.add('active');
changeLanguage();
}

function changeLanguage(){
  changeQuotes();
  changeDate();
  changeWeather();
  showGreeting();
changeSettingsLanguage();
changeCovidInfo();
changeNamePlaceholder();
}
function changeNamePlaceholder(){
  const name = document.querySelector('.name');
  if (languageKey==0)name.placeholder = "Имя";
  if (languageKey==1)name.placeholder = "Name";
  if (languageKey==2)name.placeholder = "Nombre";

}
function changeCovidInfo(){
  const covidTranslation = document.querySelectorAll('.covid-translation');
  countrySelect.value = languageKey;
  for (let i=0; i<covidTranslation.length;i++){
    covidTranslation[i].textContent = covidTranslationitems[i][languageKey];
  }
  getCovidInfo();
}
function changeSettingsLanguage(){
  if (languageKey==0)inputErrorMessage = "Неверный тэг!";
  if (languageKey==1)inputErrorMessage = "Wrong tag!"
  if (languageKey==2)inputErrorMessage = "El tag incorrecto!"
  const settingsTranslationItem = document.querySelectorAll('.translate-item');
  for (let i=0; i<settingsTranslationItem.length; i++){
    settingsTranslationItem[i].textContent = settingsTranslation[i][languageKey];
  }
}
function changeQuotes(){
  if (languageKey ==0) quotesAddress = './js/quotesRU.json';
  if (languageKey ==1) quotesAddress = './js/quotesEN.json';
  if (languageKey ==2) quotesAddress = './js/quotesES.json';
  getQuotes();
}
function changeDate(){
  if (languageKey ==0) dateMode = 'ru-RU';
  if (languageKey ==1) dateMode = 'en-US';
  if (languageKey ==2) dateMode = 'es-ES'
  showDate();
}
function changeWeather(){
  if (languageKey ==0) weatherMode = 'lang=ru';
  if (languageKey ==1) weatherMode = 'lang=en';
  if (languageKey ==2) weatherMode = 'lang=es';
  if(localStorage.getItem('city')) {
    cityUser.value = localStorage.getItem('city');
    getWeather();
  } else{
    if (languageKey ==0) cityUser.value = "Минск";
    if (languageKey ==1) cityUser.value = "Minsk";
    if (languageKey ==2) cityUser.value = "Minsk";
       
       getWeather();
  }
}
const newConfirmed = document.querySelector('.new-confirmed')
const totalConfirmed = document.querySelector('.total-confirmed')
const newDeaths = document.querySelector('.new-deaths')
const totalDeaths = document.querySelector('.total-deaths')
const countrySelect = document.querySelector('.country-select')
countrySelect.addEventListener('change', getCovidInfo)

getCovidInfo();

async function getCovidInfo() { 
  let index; 
  if (countrySelect.value==1) index = 182;
  if (countrySelect.value==0) index = 142;
  if (countrySelect.value==2) index = 162;
  try{

  const url = `https://api.covid19api.com/summary`;
  const res = await fetch(url);
  const data = await res.json();
  
  newConfirmed.textContent = data.Countries[index].NewConfirmed; 
  totalConfirmed.textContent = data.Countries[index].TotalConfirmed; 
  newDeaths.textContent = data.Countries[index].NewDeaths; 
  totalDeaths.textContent = data.Countries[index].TotalDeaths;
  }
  catch(err){
console.log("Error")
  }
}
 