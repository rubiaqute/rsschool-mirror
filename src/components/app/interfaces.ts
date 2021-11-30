export interface IDataAppViewSources {
  status: string,
  sources?: Array<IDataSources>
}
export interface IDataAppViewNews {
  status: string,
  articles?: Array<IDataNews>
  totalResults?: number
  }
export interface IDataNews {
  author: string | null,
  content: string | null,
  description: string | null,
  publishedAt: string | null,
  source: {id: string, name: string | null}
  title: string | null,
  url: string | null,
  urlToImage: string | null,
}
export interface INews {
  draw(data: Array<IDataNews>): void
}
export interface IDataSources {
  category : string | null,
  country: string | null,
  description: string | null,
  id: string | null,
  language: string | null,
  name: string | null,
  url: string |null,
}
export interface ISources {
  draw(data: Array<IDataSources>): void;
}
export interface IAppView {
  news: INews;
  sources: ISources;
  drawNews(data: IDataAppViewNews): void;
  drawSources(data: IDataAppViewSources): void
}
export interface ILoader {
  baseLink: string,
  options?: {
      [key: string]: string
  },
  getResp({ endpoint, options }: {
      endpoint: string;
      options?: {[key: string]: string};
  }, callback?: () => void): void

  makeUrl(options: {[key: string]: string},endpoint: string,): string
  errorHandler(res: Response) : Response
  load(method:string, endpoint:string, callback:(data:IDataLoader) => void, options:{}):void

}
export interface IDataLoader extends IDataAppViewNews, IDataAppViewSources{

}
export interface IApp {
  controller : ILoader
  view: IAppView
}