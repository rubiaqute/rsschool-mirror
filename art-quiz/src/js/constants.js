class Constants {
  constructor() {
    this.quantityOfQuizes = 2;
    this.quantityOfQuestionsInCategory = 10;
    this.quantityOfOptions = 4;
    this.quantityOfCategoriesInQuiz = 12;
    this.numberOfFirstArtistsQuizCategory = 0;
    this.numberOfFirstPaintingsQuizCategory = 12;
    this.quantityOfQuestionsInQuiz = this.quantityOfCategoriesInQuiz
                                     * this.quantityOfQuestionsInCategory;
    this.totalQuantityOfQuestions = this.quantityOfQuizes * this.quantityOfQuestionsInQuiz;
  }
}
const initial = new Constants();
export default initial;