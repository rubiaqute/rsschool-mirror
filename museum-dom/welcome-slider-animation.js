let items = document.querySelectorAll('.welcome-item');
let squares = document.querySelectorAll('.welcome-square');
let currentItem = 0;
let isEnabled = true;
let counter = document.querySelector(".welcome-slider-counter");
function squareActivate(n){
    squares[n].classList.add('activated-square');
}
function squareRemoveActivate(n){
    squares[n].classList.remove('activated-square');
}
function changeCounter(n) {
    counter.innerHTML = `0${n + 1} | 05`;
  }
function changeCurrentItem(n){
    currentItem= (n +items.length) % items.length;
}
function hideItem(direction){
    isEnabled=false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function(){
        this.classList.remove('active', direction)
    })
}
function showItem(direction){
    
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function(){
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled=true;
    })
}
function previousItem(n) {
    hideItem('to-right');
squareRemoveActivate(currentItem);   
changeCurrentItem(n-1);
squareActivate(currentItem);
changeCounter(currentItem);
showItem('from-left');
}
function nextItem(n) {
    hideItem('to-left');
    squareRemoveActivate(currentItem); 
    changeCurrentItem(n+1);
    squareActivate(currentItem);
    changeCounter(currentItem);
    showItem('from-right');
    }
function findActiveIndex(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].classList.contains('activated-square')) {
            return i;
          }
        }
}
     for (let i=0; i <squares.length;i++){
         squares[i].addEventListener('click', function(){
            
            squareActiveNumber = findActiveIndex(squares);
            squareRemoveActivate(squareActiveNumber)
            currentItem = squareActiveNumber;
            hideItem('to-left');
            currentItem =i;
            squareActivate(currentItem);
            changeCounter(currentItem);
            showItem('from-right');
         })
     }
 document.querySelector('.arrows-button.left').addEventListener('click', function(){
   if(isEnabled){

       previousItem(currentItem);
       
   }
    // changeCurrentItem(currentItem - 1);
 });
 document.querySelector('.arrows-button.right').addEventListener('click', function(){
    if(isEnabled){
        nextItem(currentItem);
    }
     
  });

  const swipedetect=(el) =>{
      let surface = el;
      let startX=0;
      let startY=0;
      let distY=0;
      let distX=0;
    

      let threshold = 150;
      let restraint = 100;
      let allowedTime = 500;

      let startTime =0;
      let elapsedTime = 0;
      surface.addEventListener('mousedown', function(e){
          
          startX = e.pageX;
          startY = e.pageY;
          startTime= new Date().getTime();
          e.preventDefault();

      })
      surface.addEventListener('mouseup', function(e){
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if (elapsedTime<= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                if (distX > 0){
                    if(isEnabled){
                        previousItem(currentItem);
                    }
                } else{
                    if(isEnabled){
                        nextItem(currentItem);
                    }
                }
            }
        }
        
        e.preventDefault();
        
    });
    surface.addEventListener('touchstart', function(e){
        if (e.target.classList.contains('arrows-buton')){
            if (e.target.classList.contains('left')){
                if(isEnabled){
                    previousItem(currentItem);
                }
            } else if (e.target.classList.contains('right')){
                if(isEnabled){
                    nextItem(currentItem);
            }
        }
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime= new Date().getTime();
        e.preventDefault();

    });
    surface.addEventListener('touchmove', function(e){
        e.preventDefault();
    })
    surface.addEventListener('touchend', function(e){
        let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime<= allowedTime){
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
              if (distX > 0){
                  if(isEnabled){
                      previousItem(currentItem);
                  }
              } else{
                  if(isEnabled){
                      nextItem(currentItem);
                  }
              }
          }
      }
      
      e.preventDefault();
      
  });


  }
  let el = document.querySelector('.welcome-carousel');
  swipedetect(el);