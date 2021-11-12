import {createNodetoDom, getImageData} from './base_functions.js';
import { results } from './index.js';
import createQuiz from './quiz_artists.js';
import Results from './results_page.js';
import { showQuestion } from './start_page.js';
export default class Category{
    constructor (index){
        this.index=index
    }
    fillCategory(){

        const category = createNodetoDom('div', 'category')
        const categoryNumber = createNodetoDom('div', 'number')
        categoryNumber.innerText = this.index+1;
        const categoryImage = createNodetoDom('img', 'category-image not-colored')
        categoryImage.src=`./image-data/img/${this.index*10}.jpg`
        category.append(categoryNumber, categoryImage);
        categoryImage.addEventListener('click', ()=>createQuiz(this.index))
        return category;
    }
    updateCategory(){
        const categories = document.querySelectorAll('.category');
        const category = categories.item(this.index);
        const categoryImage = category.querySelector('.category-image');
        categoryImage.classList.remove('not-colored');
        const categoryResult = createNodetoDom('div','score');
        const score = results[this.index].filter((el)=>el=="right").length;
        if (score==10) categoryResult.classList.add('best-score');
        categoryResult.innerHTML=`<p>${score}/10</p><p>see results<p>`;
        category.append(categoryResult);
        categoryResult.addEventListener('click', (e)=>createResults(this.index));
        
    }
}
function createResults(id){
    showQuestion();
    const resultsPage = new Results(id).makeResultsPage();
}