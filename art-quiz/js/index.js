import {createCategoriesPage} from './category_section.js';
import {showStartPage} from './start_page.js'


window.onload = function(){
    createCategoriesPage();
}

const gameSelector = document.querySelectorAll('.game-select')
gameSelector.forEach(el=>{
    el.addEventListener('click', ()=>{showStartPage()})
})





