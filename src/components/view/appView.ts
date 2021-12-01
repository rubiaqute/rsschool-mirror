import News from './news/news';
import Sources from './sources/sources';
import { IDataAppViewNews, IDataAppViewSources, IDataNews, IDataSources } from './../app/interfaces';

export class AppView {
  readonly news = new News();

  readonly sources = new Sources();

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IDataAppViewNews): void {
    const values:Array<IDataNews> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IDataAppViewSources): void {
    const values:Array<IDataSources> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
