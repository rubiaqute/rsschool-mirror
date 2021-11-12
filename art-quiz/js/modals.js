import {createNodetoDom, getImageData, getImageSrc, getAuthor, getName, getYear} from './base_functions.js';
import {getNextQuestion, replayLevel, finishLevel, eliminateModal} from './quiz_artists.js';
export default class Modal{
    constructor(type, id, indexCategory){
        this.type=type;
        this.id=id;
        this.indexCategory = indexCategory;
    }
    async makeModal(){
        let template="";
        template+=`<div class="icon-${this.type}"></div>`;
        const imageSrc = getImageSrc(this.id);
        const author = await getAuthor(this.id);
        const name = await getName(this.id);
        const year = await getYear(this.id);
        template+=`<div class="container-answer">`
        template+=`<img class="image-answer"src="${imageSrc}" alt="">`;
        template+='<div class="container-description">';
        template+=`<p class="description">${author}</p>`;
        template+=`<p class="description">"${name}"</p>`;
        template+=`<p class="description">${year}</p>`;
        template+='</div></div>';
        template+=`<p class="note">You're ${this.type}!</p>`;
        template+='<button class="next-question">Next</button>';
        createModalWrapper(template);
        const nextButton=document.querySelector('.next-question');
        nextButton.addEventListener('click', (e)=>getNextQuestion(this.id, this.indexCategory));
    }
    
    makeFinalModal(index){
        let template="";
        const rightBullets=document.querySelectorAll('.bullet.right');
        const score = rightBullets.length;
        
        template+=`<p class="note">Your score: <span>${score}/10</span></p>`;
        if (score==10) {
            template +=`<img class="image-result"src="./image-data/younglady.jpg" alt="">`
            template +=`<p class="note-result">You are the BEST!</p>`;
        } else{
            template +=`<img class="image-result"src="./image-data/oldlady.jpg" alt="">`
            template +=`<p class="note-result">Try better next time...</p>`;
        }
        template+='<button class="final-modal-button play-again">&#8634; Once again</button>';
        template+='<button class="final-modal-button resume">Resume</button>';
        createModalWrapper(template);
        const playAgainButton = document.querySelector('.play-again');
        playAgainButton.addEventListener('click', (e)=>replayLevel(index))
        const resumeButton = document.querySelector('.resume');
        resumeButton.addEventListener('click', (e)=>finishLevel(index));
    }
    async makePictureModal(index, indexCategory){
        console.log("Картинка "+index + " Категория "+ indexCategory);
        let template="";
        const imageSrc = getImageSrc(indexCategory*10+index);
        const author = await getAuthor(indexCategory*10+index);
        const name = await getName(indexCategory*10+index);
        const year = await getYear(indexCategory*10+index);
        // template+=`<div class="container-picture-modal">`
        template+=`<img class="image-answer big"src="${imageSrc}" alt="">`;
        template+='<div class="container-description">';
        template+=`<p class="description">${author}</p>`;
        template+=`<p class="description">"${name}"</p>`;
        template+=`<p class="description">${year}</p>`;
        template+='</div>';
        template+='<button class="next-question">Close</button>';
        
        createModalWrapper(template);
        const closeButton=document.querySelector('.next-question');
        closeButton.addEventListener('click', (e)=>eliminateModal());
    }
    
}
function createModalWrapper(template){
    const modalContainer = createNodetoDom('div', 'modal-container');
    modalContainer.innerHTML=template;
    const overlay = createNodetoDom('div', 'overlay');
    overlay.append(modalContainer);
    const game = document.querySelector('.wrapper');
    game.append(overlay); 
    

}
