const player =document.querySelector('.main-video');
const video = player.querySelector ('.main-movie');
const bigToggle = document.querySelector('.main-button');
const smallToggle = document.querySelector('.play-button');
const pauseToggle = document.querySelector('.pause-button');
const progressBig = document.querySelector('.progress-big');
const progressSmall = document.querySelector('.progress-small');

function togglePlay(){
    if (video.paused){
        video.play();
        bigToggle.style.display = "none";
        pauseToggle.style.display = "inline";
        smallToggle.style.display = "none";


    } else{
        video.pause();
        bigToggle.style.display = "inline";
        pauseToggle.style.display = "none";
        smallToggle.style.display = "inline";

    }
    
}
function handleVolumeRangeUpdate(){
video[this.name] = this.value / 100;
const valueProgress = this.value;
changeProgressVolumeColor (valueProgress);
}
function changeProgressVolumeColor(value){
    progressSmall.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
}


video.addEventListener('click', togglePlay);
// video.addEventListener('play', updateButton);
// video.addEventListener('pause', updateButton);
bigToggle.addEventListener('click', togglePlay);
smallToggle.addEventListener('click', togglePlay);
pauseToggle.addEventListener('click', togglePlay);
// progressBig.addEventListener('change',handleRangeUpdate);
progressSmall.addEventListener('change',handleVolumeRangeUpdate);
// progressBig.addEventListener('mousemove',handleRangeUpdate);
progressSmall.addEventListener('mousemove',handleVolumeRangeUpdate);
