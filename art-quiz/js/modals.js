import {createNodetoDom, getImageData, getImageSrc, getAuthor, getName, getYear} from './base_functions.js';
import {getNextQuestion} from './quiz_artists.js';
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
        const modalContainer = createNodetoDom('div', 'modal-container');
        modalContainer.innerHTML=template;
        const overlay = createNodetoDom('div', 'overlay');
        overlay.append(modalContainer);
        const game = document.querySelector('.wrapper');
        game.append(overlay);
        const nextButton=document.querySelector('.next-question');
        nextButton.addEventListener('click', (e)=>getNextQuestion(this.id, this.indexCategory));
    }
}
