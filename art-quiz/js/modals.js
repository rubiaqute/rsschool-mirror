export default class Modal{
    constructor(type){
        this.type=type;
    }
    makeModal(){
        let template="";
        template+=`<div class="icon-${this.type}"></div>`;
        template+=`<p class="note">You're ${this.type}!</p>`;
        template+='<button class="next-question">Next</button>';
        const modalContainer = createNodetoDom('div', 'modal-container');
        modalContainer.innerHTML=template;
        const overlay = createNodetoDom('div', 'overlay');
        overlay.append(modalContainer);
        const game = document.querySelector('.wrapper');
        game.append(overlay);
    }
}
function createNodetoDom(element, ...classes){
const node = document.createElement(element);
node.className=classes;
return node;
}