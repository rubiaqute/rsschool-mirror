let videosYouTube = document.querySelectorAll('.video-item');

let dotsNavigation = document.querySelectorAll('.nav-dot');
let currentVideoItem = 0;

let dotActiveNumber =0;

function dotActivate(n){
    dotsNavigation[n].classList.add('activated-dot');
 }
function dotRemoveActivate(n){
    dotsNavigation[n].classList.remove('activated-dot');
}

function changeCurrentVideoItem(n){
    currentVideoItem= (n +videosYouTube.length) % videosYouTube.length;
}
// function hideVideoItem(direction){
// isEnabled=false;
// // videosYouTube[((currentVideoItem+2 +videosYouTube.length)) % videosYouTube.length].classList.add(direction);
// //  videosYouTube[((currentVideoItem+2 +videosYouTube.length)) % videosYouTube.length].addEventListener('animationend', function(){
// // this.classList.remove('active', direction)
// // })
// }
// function showItem(direction){
    
//     items[currentItem].classList.add('next', direction);
//     items[currentItem].addEventListener('animationend', function(){
//         this.classList.remove('next', direction);
//         this.classList.add('active');
//         isEnabled=true;
//     })
// }
// function previousItem(n) {
//     hideItem('to-right');
// squareRemoveActivate(currentItem);   
// changeCurrentItem(n-1);
// squareActivate(currentItem);
// changeCounter(currentItem);
// showItem('from-left');
// }
// function nextItem(n) {
//     hideItem('to-left');
//     squareRemoveActivate(currentItem); 
//     changeCurrentItem(n+1);
//     squareActivate(currentItem);
//     changeCounter(currentItem);
//     showItem('from-right');
//     }
 function findActiveDot(arr) {
 for (let i = 0; i < arr.length; i++) {
       if (arr[i].classList.contains('activated-dot')) {
   return i;
   }
 }
}

 for (let i=0; i <dotsNavigation.length;i++){
    dotsNavigation[i].addEventListener('click', function(){
            
dotActiveNumber = findActiveDot(dotsNavigation);
console.log(currentVideoItem);
dotRemoveActivate(dotActiveNumber);
currentVideoItem =i;
console.log(currentVideoItem);
hideVideoItem(currentVideoItem);
dotActivate(currentVideoItem);

// showVideoItem('from-right');
})
}


function hideVideoItem(n) {
    // if (movie.clientWidth > 768) {
      if (n == 0) {
        for (let i = 0; i < videosYouTube.length; i++) {
          if (i != n && i != n + 1 && i != n + 2) {
            videosYouTube[i].classList.remove('active');
          } else {
            videosYouTube[i].classList.add('active');
          }
        }
      } else if (n == videosYouTube.length - 1) {
        for (let i = 0; i < videosYouTube.length; i++) {
          if (i != n && i != n - 1 && i != n - 2) {
            videosYouTube[i].classList.remove('active');
          } else {
            videosYouTube[i].classList.add('active');
          }
        }
      } else {
        for (let i = 0; i < videosYouTube.length; i++) {
          if (i != n && i != n + 1 && i != n - 1) {
            videosYouTube[i].classList.remove('active');
          } else {
            videosYouTube[i].classList.add('active');
          }
        }
      }
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
  }
//  document.querySelector('.arrows-button.left').addEventListener('click', function(){
//    if(isEnabled){

//        previousItem(currentItem);
       
//    }
//     // changeCurrentItem(currentItem - 1);
//  });
//  document.querySelector('.arrows-button.right').addEventListener('click', function(){
//     if(isEnabled){
//         nextItem(currentItem);
//     }
     
