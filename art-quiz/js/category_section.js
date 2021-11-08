import Category from './category_constructor.js';
import showStartPage from './start_page.js';


export default function createCategoriesPage(){
    createCategories();
}

async function getImageData() {  
    const images = './js/image_data.json';
    const res = await fetch(images);
    const data = await res.json(); 
    return await data;
}



async function createCategories(){
    const game = document.querySelector('body');
    let containerCategory = document.createElement('div');
    game.append(containerCategory)
    containerCategory.classList.add("categories")
    containerCategory.classList.add("hide")
    const categoryHeader=document.createElement('h3');
    categoryHeader.innerText = "Choose category:";
    containerCategory.append(categoryHeader);
    const backButton=document.createElement("button");
    backButton.className = "back";
    backButton.addEventListener('click', ()=>{showStartPage()})
    containerCategory.append(backButton)
    const data = await getImageData();
    console.log(await data.images[0])
    const quantityOfCategories = Math.floor(data.images.length/20);
    let category=[];
    for (let i=0; i< quantityOfCategories; i++){
        category[i] = new Category(i).fillCategory();
        containerCategory.append(category[i])
    }
}



    



