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
  window.addEventListener('beforeunload', setLocalStorage)

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
  

setBg();
showTime();
// getWeather()
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
cityUser.addEventListener('change', getWeather);