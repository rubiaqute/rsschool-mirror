import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '66f914ea895a4f39b188d132fb2da5d9', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
