import {createNodetoDom, getImageData} from './base_functions.js';
import { results, game } from './index.js';
import { Quiz } from './quiz.js';
import Results from './results_page.js';
import { showQuestion } from './start_page.js';
export default class Category{
    constructor (index){
        this.index=index
    }
    async  createCategoryArtistPage(){
    
        let sectionCategory = createNodetoDom('div', 'categories artists hide')
        makeCategoryWrapper(sectionCategory, 0);
        
    }
    async  createCategoryPaintingsPage(){
        let sectionCategory = createNodetoDom('div', 'categories paintings hide')
        makeCategoryWrapper(sectionCategory, 12);
    }
    fillCategory(){

        const category = createNodetoDom('div', 'category')
        const categoryNumber = createNodetoDom('div', 'number')
        categoryNumber.innerText = this.index+1;
        const categoryImage = createNodetoDom('img', 'category-image not-colored')
        categoryImage.src=`./image-data/img/${this.index*10}.jpg`
        category.append(categoryNumber, categoryImage);
        categoryImage.addEventListener('click', ()=>{const quiz = new Quiz(this.index).createQuiz()})
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
    new Results(id).makeResultsPage();
}
function makeCategoryWrapper(sectionCategory, mode){
    game.append(sectionCategory)
    const categoryHeader=document.createElement('h3');
    categoryHeader.innerText = "Choose round:";
    sectionCategory.append(categoryHeader);
    
    let containerCategory = createNodetoDom('div', 'categories_container')
    sectionCategory.append(containerCategory)
    
    let category=[];
    for (let i=mode; i< 12+mode; i++){
        category[i] = new Category(i).fillCategory();
        containerCategory.append(category[i])
        
    }
}