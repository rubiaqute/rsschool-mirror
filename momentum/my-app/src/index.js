const timeApp = document.querySelector('.time');
const dateApp = document.querySelector('.date');
const greetingApp = document.querySelector('.greeting')
const nameUser = document.querySelector('.name')




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
    console.log(hours)
    if (hours>5&&hours<12) return "morning";
    if (hours>11&&hours<18) return "afternoon";
    if (hours>17&&hours<24) return "evening";
    if (hours>0&&hours<6||hours==0) return "night";

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
  window.addEventListener('load', getLocalStorage)



showTime();