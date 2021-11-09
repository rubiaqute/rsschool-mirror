import{backButton, categoryButton} from './index.js'
export function showStartPage(){
    
    appearStartPage();
    hideCategories();
    hideBackIcon();
    hideCategoryIcon();
    eliminateQuizPage();
    
}
export function showCategories(){
    
    hideStartPage();
    appearCategories();
    appearBackIcon();
    hideCategoryIcon();
    eliminateQuizPage();
    
}
export function showQuestion(){
    appearBackIcon();
    appearCategoryIcon();
    hideStartPage();
    hideCategories();
}
export function appearStartPage(){
    const startPage = document.querySelector('.container');
    startPage.classList.remove('hide')
}
export function hideStartPage(){
    const startPage = document.querySelector('.container');
    startPage.classList.add('hide')
}
export function appearBackIcon(){
    backButton.classList.remove('hide')
}
export function hideBackIcon(){
    backButton.classList.add('hide')
}
export function appearCategories(){
    const containerCategory = document.querySelector('.categories');
    containerCategory.classList.remove('hide')
}

export function hideCategories(){
    const containerCategory = document.querySelector('.categories');
    containerCategory.classList.add('hide')
}
export function appearCategoryIcon(){
    categoryButton.classList.remove('hide')
}
export function hideCategoryIcon(){
    categoryButton.classList.add('hide')
}
export function appearQuizPage(){
    const quizPage = document.querySelector('.container-question');
    quizPage.classList.remove('hide')
}
export function eliminateQuizPage(){
    const game = document.querySelector('.wrapper');
    const quizPage = document.querySelector('.container-question');
    if (quizPage) game.removeChild(quizPage);
    
}
