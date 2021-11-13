
import {showStartPage, showCategories} from './start_page.js'
import Category from './category_constructor.js'
export const backButton=document.querySelector('.back');
export const categoryButton = document.querySelector('.categories-icon')
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage);
let results=[];
export const game = document.querySelector('.wrapper');

window.onload = function(){
    new Category().createCategoryArtistPage();
    new Category().createCategoryPaintingsPage()
    
}

const gameSelector = document.querySelectorAll('.game-select')
gameSelector.forEach(el=>{
    el.addEventListener('click', ()=>{
        for (let i=0; i<12; i++){
            if (results[i]) {
                new Category(i).updateCategory();
            }
        }
        showCategories()})
})

backButton.addEventListener('click', ()=>{showStartPage()});
categoryButton.addEventListener('click', ()=>{showCategories()});

function setLocalStorage() {
    localStorage.setItem ('object', JSON.stringify(results));
   
}
  

function getLocalStorage() {
    if(localStorage.getItem('object')) {
    results = JSON.parse (localStorage.getItem ('object'));
    console.log(results)
    } else results =[];
  }

export {results};




