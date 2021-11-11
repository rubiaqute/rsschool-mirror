import {createNodetoDom, getImageData} from './base_functions.js';
export default class Category{
    constructor (index){
        this.index=index
    }
    fillCategory(){

        let category = createNodetoDom('div', 'category')
        let categoryNumber = createNodetoDom('div', 'number')
        categoryNumber.innerText = this.index+1;
        let categoryImage = createNodetoDom('img', 'category-image')
        categoryImage.src=`./image-data/img/${this.index*10}.jpg`
        category.append(categoryNumber, categoryImage);
        return category;
    }
}