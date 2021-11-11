import {createCategoryPage} from './category_section.js';
import {showStartPage, showCategories} from './start_page.js'
export const backButton=document.querySelector('.back');
export const categoryButton = document.querySelector('.categories-icon')
export let results={};

window.onload = function(){
    createCategoryPage();
}

const gameSelector = document.querySelectorAll('.game-select')
gameSelector.forEach(el=>{
    el.addEventListener('click', ()=>{showCategories()})
})

backButton.addEventListener('click', ()=>{showStartPage()});
categoryButton.addEventListener('click', ()=>{showCategories()});




