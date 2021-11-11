import {eliminateQuizPage, showQuestion, showCategories} from './start_page.js';
import Questions from './questions.js';
import Modal from './modals.js';
import {createNodetoDom, getImageData, getImageSrc} from './base_functions.js';
import { results } from './index.js';

export default async function createQuiz(index){
    results[index]=[];
    const indexCategory = index;
    const indexQuestion = index*10;
    showQuestion();
    const game = document.querySelector('.wrapper');
    const containerQuestion = createNodetoDom('div', 'container-question')
    game.append(containerQuestion)
    const containerBullets = createNodetoDom('div', 'bullets')
    for (let i=0; i<10; i++){
        const bullet=createNodetoDom('div', 'bullet')
        containerBullets.append(bullet);
        }
    const questionText = createNodetoDom('h4', 'text-question')
    questionText.innerText = await getQuestion(indexQuestion);

    const questionImage = createNodetoDom('img', 'image-question')
    questionImage.src = getImageSrc(indexQuestion);

    const containerOptions = createNodetoDom('div', 'container-options')
    containerQuestion.append(containerBullets,questionText,questionImage, containerOptions);
    const options=await new Questions(indexQuestion).makeOptions();
    for (let i=0; i<4; i++){
    const questionOptions=createNodetoDom('div', 'options')
    questionOptions.innerText = options[i];
    containerOptions.append(questionOptions)
    questionOptions.addEventListener('click', (e)=>{
        checkAnswer(e,indexQuestion, indexCategory);
       });
    }
    
}


function getQuestion(i){
    const question =  new Questions(i).makeQuestion()
    return question;
}


async function checkAnswer(e,index, indexCategory){
    console.log(e.target.innerText);
    
    const rightAnswer = await new Questions(index).getRightAnswer();
    
    if (e.target.innerText ==rightAnswer) {
        results[indexCategory].push('right')
        colorAnswer(e.target, "right")
        colorBullet(index, "right", indexCategory);
        appearModal("right",index, indexCategory);
    } else {
        results[indexCategory].push('wrong')
        colorBullet(index, "wrong", indexCategory);
        colorAnswer(e.target, "wrong");
        appearModal("wrong", index, indexCategory);
    }

}
function colorBullet(i, type, indexCategory){
    const bullets=document.querySelectorAll('.bullet');
    const index= i-indexCategory*10;
    bullets.item(index).classList.add(type);
}
function colorAnswer(target, type){
    target.classList.add(type)
    setTimeout(()=>{
        target.classList.remove(type)
    }, 1000)
}
function appearModal(type, id, indexCategory){
    setTimeout(()=>{
        const modal = new Modal(type, id, indexCategory).makeModal();
    },0);
        
}
export function getNextQuestion(id, indexCategory){
    const index=id+1;
    eliminateModal();
    if (index - indexCategory*10==10) showFinalModal(indexCategory);
    else{
    changeQuestion(index);
    changeImage(index);
    changeOptions(index, indexCategory);
    }

}
function showFinalModal(index){
    const finalModal = new Modal().makeFinalModal(index);
}
function eliminateModal(){
    const game = document.querySelector('.wrapper');
    const overlay = document.querySelector('.overlay');
    console.log(overlay);
    if (overlay) game.removeChild(overlay);

}
async function changeQuestion(id){
    const questionText = document.querySelector('.text-question')
    questionText.innerText = await getQuestion(id);
}
function changeImage(id){
    const questionImage = document.querySelector('.image-question')
    questionImage.src = getImageSrc(id);
}
async function changeOptions(id, indexCategory){
    const options=await new Questions(id).makeOptions();
    deleteOptions();
    createOptions();
    const questionOptions=document.querySelectorAll('.options')
    for (let i=0; i<4; i++){
    
    questionOptions.item(i).innerText =options[i];
    questionOptions.item(i).addEventListener('click', (e)=>checkAnswer(e,id, indexCategory));
    }
}
function deleteOptions(){
    const questionOptions=document.querySelectorAll('.options');
    const containerOptions = document.querySelector('.container-options');
    questionOptions.forEach(el=>containerOptions.removeChild(el))
    
}
function createOptions(){
    const containerOptions = document.querySelector('.container-options');
    for(let i=0; i<4;i++){
        const questionOptions = createNodetoDom('div', 'options');
        containerOptions.append(questionOptions);
    }
    
}
export function finishLevel(){
    console.log("finish")
    eliminateModal();
    showCategories();
    writeResult();

}
export function replayLevel(index){
    eliminateModal();
    eliminateQuizPage();
    createQuiz(index);

}
function writeResult(){
    console.log(results);
}