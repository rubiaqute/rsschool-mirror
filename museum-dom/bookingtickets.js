let basicAmount = document.querySelector('.number-basic');
let seniorAmount = document.querySelector('.number-senior');
let typeRadioChoice = document.querySelectorAll('.radio-label-input');
let amountBasic = document.querySelector('.number-basic');
let amountSenior = document.querySelector('.number-senior');
let ticketTypeSelectForm = document.getElementById('tickettype')

let dateNow = new Date();
let clientDate= document.getElementById('date');
let clientTime= document.getElementById('time');
let timeVisit = document.querySelector('.time-visit')
let dateVisit = document.querySelector('.date-visit');
let typeVisit = document.querySelector('.type-visit')

let amountBasicBook = document.querySelectorAll('.number-basic-book');
let amountSeniorBook = document.querySelectorAll('.number-senior-book');


let priceTotal = document.querySelector('.total-price');
let ticketsForm = document.querySelector('.tickets-wrapper')
let bookingForm = document.querySelector('.container-side')

let priceForUnit = 0;
let buyButton = document.querySelector ('.buy-button');

let seniorAgeBook = document.querySelectorAll('.senior-age-book')
let basicAgeBook = document.querySelectorAll('.basic-age-book')

let basicSubTotal = document.querySelector('.total-basic-book');
let seniorSubTotal = document.querySelector('.total-senior-book');
let superTotal = document.querySelector('.super-total-book');



function determinePrice(e) {
priceForUnit = e.target.value;
window.sessionStorage.setItem('exhibitionTypeValue', `${priceForUnit}`);
for (let i=0;i<typeRadioChoice.length;i++){
    if (typeRadioChoice[i].checked==true){
        window.sessionStorage.setItem('exhibitionType', `${i}`);   
    }
}
};


function determineTotal(e){
priceTotal.innerText = amountBasic.value * priceForUnit + amountSenior.value *priceForUnit /2;
window.sessionStorage.setItem('amountBasic',`${amountBasic.value}`);
window.sessionStorage.setItem('amountSenior',`${amountSenior.value}`);

};

function updateTotal(e){
amountBasicBook.forEach((item) =>{
        item.value = amountBasicBook[0].value; 
})
amountSeniorBook.forEach((item) =>{
           item.value = amountSeniorBook[0].value; 
})
let n = ticketTypeSelectForm.options.selectedIndex;
basicAgeBook.forEach((item) =>{
    item.innerText = `Basic (${ticketTypeSelectForm.options[n].value}€)`
});
seniorAgeBook.forEach((item) =>{
   item.innerText = `Senior (${ticketTypeSelectForm.options[n].value / 2}€)`
});
let basicSum = amountBasicBook[0].value * ticketTypeSelectForm.options[n].value
basicSubTotal.innerText = `${basicSum}€`;
let seniorSum = amountSeniorBook[0].value * ticketTypeSelectForm.options[n].value / 2
seniorSubTotal.innerText = `${seniorSum}€`;
superTotal.innerText=`${basicSum+seniorSum} €`;
timeVisit.innerText=clientTime.value;
typeVisit.innerText= ticketTypeSelectForm.options[n].text;
}

function transmitData(){
amountBasicBook.forEach((item) =>{
 item.value = amountBasic.value; 
})
amountSeniorBook.forEach((item) =>{
    item.value = amountSenior.value; 
   })

ticketTypeSelectForm.options.selectedIndex = Number(window.sessionStorage.getItem('exhibitionType')) + 1;
let n = ticketTypeSelectForm.options.selectedIndex;
basicAgeBook.forEach((item) =>{
     item.innerText = `Basic (${ticketTypeSelectForm.options[n].value}€)`
});
seniorAgeBook.forEach((item) =>{
    item.innerText = `Senior (${ticketTypeSelectForm.options[n].value / 2}€)`
});
typeVisit.innerText= ticketTypeSelectForm.options[n].text;
let basicSum = amountBasicBook[0].value * ticketTypeSelectForm.options[n].value
basicSubTotal.innerText = `${basicSum}€`;
let seniorSum = amountSeniorBook[0].value * ticketTypeSelectForm.options[n].value / 2
seniorSubTotal.innerText = `${seniorSum}€`;
superTotal.innerText=`${basicSum+seniorSum} €`;
}

for (let i=0; i<typeRadioChoice.length;i++){
    typeRadioChoice[i].addEventListener('click', determinePrice)
        
    };
ticketsForm.addEventListener('click', determineTotal);
bookingForm.addEventListener('click', updateTotal);
document.addEventListener("DOMContentLoaded", function(){
    priceForUnit =window.sessionStorage.getItem('exhibitionTypeValue');
    if(window.sessionStorage.getItem('exhibitionType')) typeRadioChoice[window.sessionStorage.getItem('exhibitionType')].checked=true;
    amountBasic.value = window.sessionStorage.getItem('amountBasic');
    amountSenior.value=window.sessionStorage.getItem('amountSenior');
    priceTotal.innerText = amountBasic.value * priceForUnit + amountSenior.value *priceForUnit /2;
})
buyButton.addEventListener('click', transmitData);
clientDate.addEventListener('change', validateDate);

function validateDate(e) {
if ( clientDate.value< dateNow.toISOString()){
clientDate.value="0";
clientDate.style.backgroundColor="red";

} else {
    clientDate.style.backgroundColor="#ffffff";
let readableDate = new Date(clientDate.value);

let month=readableDate.getMonth();
let dayVisit=readableDate.getDate();
let dayWeek=readableDate.getDay();
let monthsContainer=[
    'January', 'February','March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December'];
let weekContainer = [
    'Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayConstructor = `${weekContainer[dayWeek]}, ${monthsContainer[month]} ${dayVisit}`;

dateVisit.innerText=dayConstructor;
}
};

// Validation part
const nameContainer = document.getElementById('name-container');
const emailContainer = document.getElementById('email-container');
const phoneContainer = document.getElementById('phone-container');

const nameInvalidMessage = document.querySelector('.name-invalid-message');
const emailInvalidMessage = document.querySelector('.email-invalid-message');
const phoneInvalidMessage = document.querySelector('.phone-invalid-message');

const clientName = document.getElementById('name');
clientName.addEventListener('change', (e) =>{
    const reg = /^[A-Za-zА-Яа-я\s]{3,15}$/
    if (!clientName.value.match(reg)) {
        clientName.value = "";
        nameContainer.style.border=" 2px solid red";
        nameInvalidMessage.style.display = "block";
        setTimeout(() =>{nameContainer.style.border="2px solid black"},2000);
        setTimeout(() =>{nameInvalidMessage.style.display = "none"},2000);
            
    }
})
const clientEmail = document.getElementById('e-mail');
clientEmail.addEventListener('change', (e) =>{
    const reg1 = /^[A-Za-zА-Яа-я0-9_-]{3,15}@[A-Za-z]{4,}\.[a-zA-Z]{2,}$/;
    if (!clientEmail.value.match(reg1)) {
        clientEmail.value = "";
        emailContainer.style.border=" 2px solid red";
        emailInvalidMessage.style.display = "block";
        setTimeout(() =>{emailContainer.style.border="2px solid black"},2000);
        setTimeout(() =>{emailInvalidMessage.style.display = "none"},2000);
        
    }
})
const clientPhone = document.getElementById('phone');
clientPhone.addEventListener('change', (e) =>{
    const reg2 = /(^[\d]{2,3}[ -][\d]{2,3}([ -][\d]{2,3})*([ -][\d]{2,3})*([ -][\d]{2})*$|^[\d]{1,10}$)/;
    const phoneDigits = clientPhone.value.match(/[0-9]/g);
    
    if (!reg2.test(clientPhone.value)||phoneDigits.length>10) {
        clientPhone.value = "";
        phoneContainer.style.border=" 2px solid red";
        phoneInvalidMessage.style.display = "block";
        setTimeout(() =>{phoneContainer.style.border="2px solid black"},2000);
        setTimeout(() =>{phoneInvalidMessage.style.display = "none"},2000);
        
    }
})
