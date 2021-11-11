import Category from './category_constructor.js';
import createQuiz from './quiz_artists.js'
import {createNodetoDom, getImageData} from './base_functions.js';


export async function createCategoryPage(){
    const game = document.querySelector('.wrapper');
    let sectionCategory = createNodetoDom('div', 'categories hide')
    game.append(sectionCategory)
    const categoryHeader=document.createElement('h3');
    categoryHeader.innerText = "Choose category:";
    sectionCategory.append(categoryHeader);
    
    let containerCategory = createNodetoDom('div', 'categories_container')
    sectionCategory.append(containerCategory)
    const data = await getImageData();
    const quantityOfCategories = Math.floor(data.images.length/20);
    let category=[];
    for (let i=0; i< quantityOfCategories; i++){
        category[i] = new Category(i).fillCategory();
        containerCategory.append(category[i])
        category[i].addEventListener('click', ()=>createQuiz(i))
    }
}



    



