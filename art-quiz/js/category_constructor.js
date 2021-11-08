export default class Category{
    constructor (index){
        this.index=index
    }
    fillCategory(){
        let category = document.createElement('div')
        category.className = 'category';
        let categoryNumber = document.createElement('div')
        categoryNumber.className = 'number';
        categoryNumber.innerText = this.index+1;
        let categoryImage = document.createElement('img')
        categoryImage.src=`./image-data/image-category/${this.index+1}.jpg`
        category.append(categoryNumber, categoryImage);
        return category;

    }
}