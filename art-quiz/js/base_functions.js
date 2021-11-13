


export function createNodetoDom(element, ...classes){
    const node = document.createElement(element);
    node.className=classes;
    return node;
}
export async function getImageData() {  
    const images = './js/image_data.json';
    const res = await fetch(images);
    const data = await res.json(); 
    return await data;
}
export function getImageSrc(i){
    const src =  `./image-data/img/${i}.jpg`;
    return src;
}
export async function getName(id){
    const data = await getImageData();
    return await data.images[id].name;
}

export async function getAuthor(id){
    const data = await getImageData();
    return await data.images[id].author;
}
export async function getYear(id){
    const data = await getImageData();
    return await data.images[id].year;
}



    