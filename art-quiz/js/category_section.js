import Category from './category_constructor.js';
import startQuiz from './quiz_artists.js'


export async function getImageData() {  
    const images = './js/image_data.json';
    const res = await fetch(images);
    const data = await res.json(); 
    return await data;
}



export async function createCategories(){
    const game = document.querySelector('.wrapper');
    let sectionCategory = document.createElement('div');
    game.append(sectionCategory)
    sectionCategory.classList.add("categories")
    sectionCategory.classList.add("hide")
    const categoryHeader=document.createElement('h3');
    categoryHeader.innerText = "Choose category:";
    sectionCategory.append(categoryHeader);
    
    let containerCategory = document.createElement('div')
    containerCategory.className = "categories_container";
    sectionCategory.append(containerCategory)
    const data = await getImageData();
    const quantityOfCategories = Math.floor(data.images.length/20);
    let category=[];
    for (let i=0; i< quantityOfCategories; i++){
        category[i] = new Category(i).fillCategory();
        containerCategory.append(category[i])
        category[i].addEventListener('click', ()=>startQuiz(i))
    }
}



    



