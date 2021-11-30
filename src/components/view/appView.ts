import News from './news/news';
import Sources from './sources/sources';
import {IDataAppViewNews, IDataAppViewSources} from './../app/interfaces'

export class AppView {
    news = new News;
    sources = new Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDataAppViewNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDataAppViewSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
