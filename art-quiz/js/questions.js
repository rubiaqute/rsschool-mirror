import {getImageData} from './category_section.js'
export default class Questions{
     constructor (id){
         this.id = id;
     }
     async makeQuestion(){
         const name = await getName(this.id);
         let questionText= `Who is the author of "${name}"?`
         return questionText;
     }
     async makeOptions(){
         let options=[];
         const author = await getAuthor(this.id);

     }
}
async function getName(id){
    const data = await getImageData();
    return await data.images[id].name;
}