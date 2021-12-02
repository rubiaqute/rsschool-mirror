import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '0645388d77f340829ee405876f900a70', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
