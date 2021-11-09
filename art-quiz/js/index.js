import {createCategories} from './category_section.js';
import {showStartPage, showCategories} from './start_page.js'
export const backButton=document.querySelector('.back');
export const categoryButton = document.querySelector('.categories-icon')

window.onload = function(){
    createCategories();
}

const gameSelector = document.querySelectorAll('.game-select')
gameSelector.forEach(el=>{
    el.addEventListener('click', ()=>{showCategories()})
})

backButton.addEventListener('click', ()=>{showStartPage()});
categoryButton.addEventListener('click', ()=>{showCategories()});




