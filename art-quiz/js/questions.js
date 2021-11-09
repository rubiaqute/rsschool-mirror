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
         options.push(author);
         for (let i =0; i<3;i++){
            let fakeAuthor;
            do{ let fakeId;
            do{
                fakeId = Math.round(Math.random()*240);
            }while(fakeId==this.id);
            fakeAuthor = await getAuthor(fakeId);
        } while (options.includes(fakeAuthor));
            options.push(fakeAuthor);
         }
         
         const shuffledOptions = shuffle(options);
         return shuffledOptions;

     }
}
async function getName(id){
    const data = await getImageData();
    return await data.images[id].name;
}

async function getAuthor(id){
    const data = await getImageData();
    return await data.images[id].author;
}
function shuffle(array){
    array.sort(() => Math.random()-0.5);
    return array;
}