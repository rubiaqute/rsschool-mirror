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
  source: { id: string, name: string | null }
  title: string | null,
  url: string | null,
  urlToImage: string | null,
}

export interface IDataSources {
  category : string | null,
  country: string | null,
  description: string | null,
  id: string | null,
  language: string | null,
  name: string | null,
  url: string | null,
}
