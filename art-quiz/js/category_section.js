import Category from './category_constructor.js';
import {showStartPage} from './start_page.js';
import startQuiz from './quiz_artists.js'

function createCategoriesPage(){
    createCategories();
}

async function getImageData() {  
    const images = './js/image_data.json';
    const res = await fetch(images);
    const data = await res.json(); 
    return await data;
}



async function createCategories(){
    const game = document.querySelector('.wrapper');
    let sectionCategory = document.createElement('div');
    game.append(sectionCategory)
    sectionCategory.classList.add("categories")
    sectionCategory.classList.add("hide")
    const categoryHeader=document.createElement('h3');
    categoryHeader.innerText = "Choose category:";
    sectionCategory.append(categoryHeader);
    const backButton=document.createElement("button");
    backButton.className = "back";
    backButton.addEventListener('click', ()=>{showStartPage()})
    sectionCategory.append(backButton)
    let containerCategory = document.createElement('div')
    containerCategory.className = "categories_container";
    sectionCategory.append(containerCategory)
    const data = await getImageData();
    console.log(await data.images[0])
    const quantityOfCategories = Math.floor(data.images.length/20);
    let category=[];
    for (let i=0; i< quantityOfCategories; i++){
        category[i] = new Category(i).fillCategory();
        containerCategory.append(category[i])
        category[i].addEventListener('click', ()=>startQuiz(i))
    }
}

export {createCategoriesPage, getImageData}

    



