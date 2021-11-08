class Questions{
     constructor (author, name, year, imageNum){
         this.author = author;
         this.name = name;
         this.year = year;
         this.imageNum= imageNum;
     }
     makeQuestion(){
         let questionText= `Who is the author of ${this.name}?`
     }
}