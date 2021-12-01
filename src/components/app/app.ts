import AppController from '../controller/controller';
import { AppView } from '../view/appView';


class App {
  private readonly controller = new AppController();

  private readonly view = new AppView();

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start():void {
    document
      .querySelector('.sources')
      .addEventListener('click', (e: Event): void => this.controller.getNews(e, (data) => this.view.drawNews(data)));
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
