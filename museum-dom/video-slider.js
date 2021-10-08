let videosYouTube = document.querySelectorAll('.video-item');
let mainVideo = document.querySelector('.main-movie')
let dotsNavigation = document.querySelectorAll('.nav-dot');
let currentVideoItem = 0;
let nextVideoItem = 0;
let dotActiveNumber =0;
let isVideoEnabled = true;
let videoContainer=[
    '../museum-dom/assets/video/video0.mp4',
    '../museum-dom/assets/video/video1.mp4',
    '../museum-dom/assets/video/video2.mp4',
    '../museum-dom/assets/video/video3.mp4',
    '../museum-dom/assets/video/video4.mp4',
    
]
let posterContainer=[
    '../museum-dom/assets/video/poster0.jpg',
    '../museum-dom/assets/video/poster1.jpg',
    '../museum-dom/assets/video/poster2.jpg',
    '../museum-dom/assets/video/poster3.jpg',
    '../museum-dom/assets/video/poster4.jpg',
    
]
function changeMainVideo(n){
    mainVideo.src = videoContainer[n];
    mainVideo.poster = posterContainer[n];
    
  
}

function dotActivate(n){
    dotsNavigation[n].classList.add('activated-dot');
 }
function dotRemoveActivate(n){
    dotsNavigation[n].classList.remove('activated-dot');
}

function changeCurrentVideoItem(n){
    currentVideoItem= (n +videosYouTube.length) % videosYouTube.length;
}
function hideVideoItemArrows(direction){
isVideoEnabled=false;
videosYouTube[currentVideoItem].classList.add(direction);
videosYouTube[currentVideoItem].addEventListener('animationend', function(){
this.classList.remove('active', direction)
setTimeout(1000);
})
}
function showVideoItemArrows(direction){
nextVideoItem = (currentVideoItem + videosYouTube.length) % videosYouTube.length;
videosYouTube[nextVideoItem].classList.add('next', direction);
videosYouTube[nextVideoItem].addEventListener('animationend', function(){
this.classList.remove('next', direction);
this.classList.add('active');
this.style.order = "0";
setTimeout(500);
});
nextVideoItem = (currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length;
videosYouTube[nextVideoItem].classList.add('next', direction);
videosYouTube[nextVideoItem].addEventListener('animationend', function(){
this.classList.remove('next', direction);
this.classList.add('active');
this.style.order = "1";
setTimeout(500);


});
nextVideoItem = (currentVideoItem + 2 + videosYouTube.length) % videosYouTube.length;

videosYouTube[nextVideoItem].classList.add('next', direction);
videosYouTube[nextVideoItem].addEventListener('animationend', function(){
this.classList.remove('next', direction);
this.classList.add('active');
this.style.order = "2";

})
isVideoEnabled=true;
}
function previousVideoItem(n) {
hideVideoItemArrows('to-right');
   
changeCurrentVideoItem(n+1);
// console.log(currentVideoItem);  
// squareActivate(currentItem);
// 
showVideoItemArrows('from-left');


}

function nextVideoItemArrows(n) {
hideNextVideoItemArrows('to-left');

changeCurrentVideoItem(n-1);
//     squareActivate(currentItem);
 
showNextVideoItemArrows('from-right');


}
function hideNextVideoItemArrows(direction){
    isVideoEnabled=false;
    
    nextVideoItem = (currentVideoItem + 2 + videosYouTube.length) % videosYouTube.length;
    
    videosYouTube[nextVideoItem].classList.add(direction);
    videosYouTube[nextVideoItem].addEventListener('animationend', function(){
    this.classList.remove('active', direction)
    setTimeout(1000);
    })
    }
function showNextVideoItemArrows(direction){
    nextVideoItem = (currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length;
        videosYouTube[nextVideoItem].classList.add('next', direction);
        videosYouTube[nextVideoItem].addEventListener('animationend', function(){
        this.classList.remove('next', direction);
        this.classList.add('active');
        this.style.order = "1";
        setTimeout(500);
       ;
        
});

nextVideoItem = (currentVideoItem + videosYouTube.length) % videosYouTube.length;
videosYouTube[nextVideoItem].classList.add('next', direction);
videosYouTube[nextVideoItem].addEventListener('animationend', function(){
this.classList.remove('next', direction);
this.classList.add('active');
this.style.order = "0";
setTimeout(500);
});

nextVideoItem = (currentVideoItem + 2 + videosYouTube.length) % videosYouTube.length;
        
        videosYouTube[nextVideoItem].classList.add('next', direction);
        videosYouTube[nextVideoItem].addEventListener('animationend', function(){
        this.classList.remove('next', direction);
        this.classList.add('active');
        this.style.order = "2";
        
        })
    isVideoEnabled=true;
}

function findActiveDot(arr) {
for (let i = 0; i < arr.length; i++) {
if (arr[i].classList.contains('activated-dot')) {
return i;
}
}
};

for (let i=0; i <dotsNavigation.length;i++){
dotsNavigation[i].addEventListener('click', function(){
console.log(findActiveDot(dotsNavigation));
            
currentVideoItem = findActiveDot(dotsNavigation);
console.log(currentVideoItem);
dotRemoveActivate(currentVideoItem);
do{
    previousVideoItem(currentVideoItem);
    // dotActivate = (dotActivate + 1 + dotsNavigation.lenghth) % dotsNavigation;
} while (currentVideoItem!=((i-1+dotsNavigation.length) % dotsNavigation.length));
// currentVideoItem = i;
// console.log(currentVideoItem);
// hideVideoItem(currentVideoItem);
dotActivate((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
changeMainVideo((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length)
// currentVideoItem=((currentVideoItem +1+dotsNavigation.length) % dotsNavigation.length);
});
}

// // showVideoItem('from-right');
// })
// }


// function hideVideoItem(n) {
//     // if (movie.clientWidth > 768) {
//       if (n == 0) {
//         for (let i = 0; i < videosYouTube.length; i++) {
//           if (i != n && i != n + 1 && i != n + 2) {
//             videosYouTube[i].classList.remove('active');
//           } else {
//             videosYouTube[i].classList.add('active');
//           }
//         }
//       } else if (n == videosYouTube.length - 1) {
//         for (let i = 0; i < videosYouTube.length; i++) {
//           if (i != n && i != n - 1 && i != n - 2) {
//             videosYouTube[i].classList.remove('active');
//           } else {
//             videosYouTube[i].classList.add('active');
//           }
//         }
//       } else {
//         for (let i = 0; i < videosYouTube.length; i++) {
//           if (i != n && i != n + 1 && i != n - 1) {
//             videosYouTube[i].classList.remove('active');
//           } else {
//             videosYouTube[i].classList.add('active');
//           }
//         }
//       }
    // }
    //  else {
    //   if (activeIndex == 0) {
    //     for (let i = 0; i < sliders.length; i++) {
    //       if (i != activeIndex && i != activeIndex + 1) {
    //         sliders[i].style.display = "none";
    //       } else {
    //         sliders[i].style.display = "block";
    //       }
    //     }
    //   } else if (activeIndex == sliders.length - 1) {
    //     for (let i = 0; i < sliders.length; i++) {
    //       if (i != activeIndex && i != activeIndex - 1) {
    //         sliders[i].style.display = "none";
    //       } else {
    //         sliders[i].style.display = "block";
    //       }
    //     }
    //   } else {
    //     for (let i = 0; i < sliders.length; i++) {
    //       if (i != activeIndex && i != activeIndex + 1) {
    //         sliders[i].style.display = "none";
    //       } else {
    //         sliders[i].style.display = "block";
    //       }
    //     }
    //   }
    // }
//   }
document.querySelector('.video-arrows.left').addEventListener('click', function(){
if(isVideoEnabled){
    dotRemoveActivate((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
    nextVideoItemArrows(currentVideoItem);
    
changeMainVideo((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
dotActivate((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
}

});
document.querySelector('.video-arrows.right').addEventListener('click', function(){
if(isVideoEnabled){
    dotRemoveActivate((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
    previousVideoItem(currentVideoItem);
    changeMainVideo((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
    dotActivate((currentVideoItem + 1 + videosYouTube.length) % videosYouTube.length);
    }
});
     
