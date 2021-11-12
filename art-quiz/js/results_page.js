import { createNodetoDom } from "./base_functions.js"
import { results } from "./index.js";
import { getImageSrc } from "./base_functions.js";
import Modal from "./modals.js"

export default class Results{
    constructor(indexCategory){
        this.index = indexCategory
    }
    makeResultsPage(){
        const game = document.querySelector('.wrapper');
        const resultsContainer = createNodetoDom('div', 'container-results');
        let template='';
        const score = results[this.index].filter((el)=>el=="right").length;
        template += `<div class="results-header"><h5>Round ${this.index+1}</h5><p class="results-header_score">Your score: ${score}/10</p></div>`;
        template +='<div class="images-results">'
        for (let i=0; i<10; i++){
            const imageSrc= getImageSrc(this.index*10+i)
            let imageClass;
            if (results[this.index][i]=="right") imageClass = "colored";
            else imageClass = "black-white"
            template += `<div class="image-results ${imageClass}"><img class="${imageClass}" alt="" src =${imageSrc}></div>`
        }
        template +="</div>"
        resultsContainer.innerHTML=template;
        game.append(resultsContainer);
        const imageResults=document.querySelectorAll('.image-results');
        imageResults.forEach((el, index)=> el.addEventListener('click', (e) => {
            const pictureModal = new Modal().makePictureModal(index, this.index)}));
            

    }
}
