import playList from './assets/playlist.js';
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
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity')
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const cityUser = document.querySelector('.city');
const quoteApp = document.querySelector('.quote');
const authorQuoteApp = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote')
const audio = new Audio();


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
    localStorage.setItem('city', cityUser.value);
  }
  

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      nameUser.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        cityUser.value = localStorage.getItem('city');
        getWeather();
      } else{
           cityUser.value = "Минск";
           getWeather();
      }
  }

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

 async function getWeather() {  
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityUser.value}&lang=en&appid=e57257892292e552c0054a48a736b278&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
      } catch(err) {
        weatherError.textContent = `Error! city not found for '${cityUser.value}'!`;
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        windSpeed.textContent = ``;
        humidity.textContent = '';
      }
  }
  

  async function getQuotes() {  
    const quotes = './assets/quotesEN.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const pickQuote = Math.floor(Math.random() * data.quotes.length);
    quoteApp.textContent = data.quotes[pickQuote].quote;
    authorQuoteApp.textContent = data.quotes[pickQuote].author;
  }
  
    
  function playAudio() {
    
    if(!isPlay){
      console.log(audio.src);
    // audio.currentTime = 0;
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

