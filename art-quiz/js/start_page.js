export default function showStartPage(){
    
    toggleStartPage();
    toggleCategories();
    
}
export function toggleStartPage(){
    const startPage = document.querySelector('.container');
    if(startPage.classList.contains('hide')){
        startPage.classList.remove('hide')
    } else startPage.classList.add('hide')
}

function toggleCategories(){
    const containerCategory = document.querySelector('.categories');
    
    if(containerCategory.classList.contains('hide')){
        containerCategory.classList.remove('hide')
    } else containerCategory.classList.add('hide')
}