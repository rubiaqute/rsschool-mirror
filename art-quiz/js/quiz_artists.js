import {showQuestion} from './start_page.js';
import Questions from './questions.js';

export default async function startQuiz(index){
    showQuestion();
    const game = document.querySelector('.wrapper');
    const containerQuestion = document.createElement('div');
    game.append(containerQuestion)
    containerQuestion.className="container-question";

    const containerBullets = document.createElement('div')
    containerBullets.className="bullets";
    for (let i=0; i<10; i++){
        const bullet=document.createElement('div');
        bullet.className = "bullet";
        
        containerBullets.append(bullet);
        }


    const questionText = document.createElement('h4')
    questionText.innerText = await getQuestion(index);

    const questionImage = document.createElement('img')
    questionImage.src = getImage(index);

    const containerOptions = document.createElement('div')
    containerOptions.className="container_options";
    containerQuestion.append(containerBullets,questionText,questionImage, containerOptions);
    const options=await new Questions(index*10).makeOptions();
    console.log(options);
    for (let i=0; i<4; i++){
    const questionOptions=document.createElement('div');
    questionOptions.className = "options"
    questionOptions.innerText = options[i];
    containerOptions.append(questionOptions)
    questionOptions.addEventListener('click', (e)=>checkAnswer(e,i,index));
    }
    
}
function getImage(i){
    const src =  `./image-data/img/${i*10}.jpg`;
    return src;
}
function getQuestion(i){
    const question =  new Questions(i*10).makeQuestion()
    return question;
}


async function checkAnswer(e,i,index){
    console.log(e.target.innerText);
    
    const rightAnswer = await new Questions(index*10).getRightAnswer();
    
    if (e.target.innerText ==rightAnswer) {
        makeBulletRight(index);
        appearModal();
    } else {
        makeBulletWrong(index);
        appearModal();
    }

}
function makeBulletRight(i){
    const bullets=document.querySelectorAll('.bullet');
    const index= i%i;
    bullets.item(index).classList.add('right');
}
function makeBulletWrong(i){
    const bullets=document.querySelectorAll('.bullet');
    const index= i%i;
    bullets.item(index).classList.add('wrong');
}
