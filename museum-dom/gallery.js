function shuffle(array){
    array.sort(()=>Math.random()-0.5);
}
function GetIMG()  {
const pictureInnerContainer=document.querySelector('.picture-inner-container');

let srcArray=[
'../museum-dom/assets/img/gallery/galery1.jpg',
'../museum-dom/assets/img/gallery/galery2.jpg',
'../museum-dom/assets/img/gallery/galery3.jpg',
'../museum-dom/assets/img/gallery/galery4.jpg',
'../museum-dom/assets/img/gallery/galery5.jpg',
'../museum-dom/assets/img/gallery/galery6.jpg',
'../museum-dom/assets/img/gallery/galery7.jpg',
'../museum-dom/assets/img/gallery/galery8.jpg',
'../museum-dom/assets/img/gallery/galery9.jpg',
'../museum-dom/assets/img/gallery/galery10.jpg',
'../museum-dom/assets/img/gallery/galery11.jpg',
'../museum-dom/assets/img/gallery/galery12.jpg',
'../museum-dom/assets/img/gallery/galery13.jpg',
'../museum-dom/assets/img/gallery/galery14.jpg',
'../museum-dom/assets/img/gallery/galery15.jpg'
]
let img=[];
shuffle(srcArray);
for (let i=0; i<srcArray.length;i++){
img[i]=document.createElement('img');
img[i].classList.add('gallery-img');
img[i].src=srcArray[i];
img[i].alt='';
pictureInnerContainer.append(img[i]);
}
}
GetIMG();