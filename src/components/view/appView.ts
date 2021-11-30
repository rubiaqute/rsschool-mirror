import News from './news/news';
import Sources from './sources/sources';
interface IDataAppViewSources {
    status: string,
    sources?: Array<IDataSources>
}
interface IDataAppViewNews {
    status: string,
    articles?: Array<IDataNews>
    }
interface IDataNews {
    author: string | null,
    content: string | null,
    description: string | null,
    publishedAt: string | null,
    source: {id: string, name: string | null}
    title: string | null,
    url: string | null,
    urlToImage: string | null,
}
interface INews {
    draw(data: Array<IDataNews>): void
}
interface IDataSources {
    category : string | null,
    country: string | null,
    description: string | null,
    id: string | null,
    language: string | null,
    name: string | null,
    url: string |null,
}
interface ISources {
    draw(data: Array<IDataSources>): void;
}
export class AppView {
    news: INews;
    sources: ISources;
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
