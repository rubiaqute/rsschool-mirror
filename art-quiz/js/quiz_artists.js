import {toggleCategories} from './start_page.js';
import {getImageData} from "./category_section.js";
import Questions from './questions.js';

export default async function startQuiz(i){
    toggleCategories();
    const game = document.querySelector('.wrapper');
    const containerQuestion = document.createElement('div');
    game.append(containerQuestion)
    containerQuestion.className="container-question";

    const containerBullets = document.createElement('div')
    containerBullets.className="bullets";

    const questionText = document.createElement('h4')
    questionText.innerText = await getQuestion(i);

    const questionImage = document.createElement('img')
    questionImage.src = getImage(i);

    const containerOptions = document.createElement('div')
    containerOptions.className="container_options";
    containerQuestion.append(containerBullets,questionText,questionImage, containerOptions);

    for (let i=0; i<4; i++){
    const questionOptions=document.createElement('div');
    questionOptions.className = "options"
    containerOptions.append(questionOptions)
    }
    
}
function getImage(i){
    const src =  `./image-data/img/${i*10+1}.jpg`;
    return src;
}
function getQuestion(i){
    const question =  new Questions(i*10+1).makeQuestion()
    return question;
}

