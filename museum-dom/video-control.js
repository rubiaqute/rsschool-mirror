const player =document.querySelector('.main-video');

const video = player.querySelector ('.main-movie');
const bigToggle = document.querySelector('.main-button');
const smallToggle = document.querySelector('.play-button');
const pauseToggle = document.querySelector('.pause-button');
let progressBig;
if (player.clientWidth >728) { 
    progressBig = document.getElementById('progress-desktop');
} else progressBig = document.getElementById('progress-mobile');

const progressSmall = document.querySelector('.progress-small');
const volumeToggle = document.querySelector('.volume-button');
const muteToggle = document.querySelector('.mute-button');
const fullScreenToggle = document.querySelector ('.fullscreen-button');
const innerScreenToggle = document.querySelector('.innerscreen-button');

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
    
    if (progressSmall.value == 0){
        volumeToggle.style.display ="none";
        muteToggle.style.display="inline";
        
    } else {
        volumeToggle.style.display ="inline";
        muteToggle.style.display="none";
    }

        const valueProgress = this.value;
        video[this.name] = this.value / 100;
        changeProgressVolumeColor (valueProgress);
    


}

function changeProgressVolumeColor(value){
    progressSmall.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
}

function toggleMute() {
    progressSmall.value = 0;
    volumeToggle.style.display ="none";
    muteToggle.style.display="inline";
    changeProgressVolumeColor(0);
    video["volume"] = 0;
}
function toggleVolume() {
    progressSmall.value = 40;
    video["volume"] = 0.4;
    muteToggle.style.display="none";
    volumeToggle.style.display ="inline";
    changeProgressVolumeColor(40);
}
function handleProgressRangeUpdate(){
    
percent= Math.ceil((video.currentTime / video.duration) *100);
if (percent){
progressBig.value=percent;
progressBig.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #fff ${percent}%, white 100%)`;
} else progressBig.value = 0;
}
function scrub(e){
    const scrubTime = (e.offsetX / progressBig.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
function returnInitialSettings(){
    bigToggle.style.display = "inline";
    pauseToggle.style.display = "none";
    smallToggle.style.display = "inline";
    video.load();
    
    progressBig.value = 0;
    console.log(progressBig.value);
    video.duration =0;
    progressBig.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
}
function makeFullScreen() {
    let elem = document.fullscreenElement;
  if (player != elem) {
    player.requestFullscreen();
    fullScreenToggle.style.display ="none";
    innerScreenToggle.style.display="inline";
    
  } else {
    document.exitFullscreen();
    fullScreenToggle.style.display ="inline";
    innerScreenToggle.style.display="none";
  }

}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgressRangeUpdate);
video.addEventListener('ended', returnInitialSettings);

bigToggle.addEventListener('click', togglePlay);
smallToggle.addEventListener('click', togglePlay);
pauseToggle.addEventListener('click', togglePlay);

progressSmall.addEventListener('change',handleVolumeRangeUpdate);
progressSmall.addEventListener('mousemove',handleVolumeRangeUpdate);
volumeToggle.addEventListener('click', toggleMute);
muteToggle.addEventListener('click', toggleVolume);

fullScreenToggle.addEventListener('click', makeFullScreen);
innerScreenToggle.addEventListener('click', makeFullScreen);


let mousedown = false;
progressBig.addEventListener('click', scrub);
progressBig.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBig.addEventListener('mousedown', () => mousedown=true);
progressBig.addEventListener('mouseup', () => mousedown=false);

//Управление с клавиатуры
let videoSection = document.querySelector('.video-player');
document.addEventListener("keydown", pressKeyButton);
function pressKeyButton(key) {
    
    if (window.pageYOffset >= videoSection.offsetTop - 100 && window.pageYOffset < videoSection.offsetTop + videoSection.getBoundingClientRect().height) {
      let keyCode = key.code.toString();
      switch (keyCode) {
        case "Space":
          key.preventDefault();
          togglePlay();
          break;
        // case "Period":
        //   if (video.playbackRate < 2) {
        //     clearTimeout(timeoutSpeed);
        //     video.playbackRate += 0.25;
        //     speed.innerHTML = `${video.playbackRate}x`;
        //     speed.style.opacity = "100%";
        //     timeoutSpeed = setTimeout(() => {
        //       speed.style.opacity = "0";
        //     }, 2000);
        //   }
        //   break;
        // case "Comma":
        //   if (video.playbackRate > 0.25) {
        //     clearTimeout(timeoutSpeed);
        //     video.playbackRate -= 0.25;
        //     speed.innerHTML = `${video.playbackRate}x`;
        //     speed.style.opacity = "100%";
        //     timeoutSpeed = setTimeout(() => {
        //       speed.style.opacity = "0";
        //     }, 2000);
        //   }
        //   break;
        case "KeyM":
            if (progressSmall.value==0) toggleVolume()
          else toggleMute();
          break;
        case "KeyF":
            makeFullScreen();
          break;
        // case "ArrowRight":
        //   video.currentTime += 5;
        //   let valPlus = Math.ceil((video.currentTime / video.duration) * 100);
        //   progress.value = valPlus;
        //   plusFive.style.opacity = "100%";
        //   setTimeout(() => {
        //     plusFive.style.opacity = "0";
        //   }, 1400);
        //   break;
        // case "ArrowLeft":
        //   video.currentTime -= 5;
        //   let valMinus = Math.ceil((video.currentTime / video.duration) * 100);
        //   progress.value = valMinus;
        //   minusFive.style.opacity = "100%";
        //   setTimeout(() => {
        //     minusFive.style.opacity = "0";
        //   }, 1400);
        //   break;
      }
    }
  }