import { IDataAppViewNews, IDataAppViewSources } from './../app/interfaces';
import { Endpoint, Method } from './../app/enum';

class Loader {
  readonly baseLink: string;

  readonly options: {
    [key: string]: string
  };

  constructor(baseLink:string, options:{ [key: string]: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }:{
      endpoint: Endpoint;
      options?: { [key: string]: string };
    },
    callback = ():void => {
      console.error(`No callback for ${Method.get} response`);
    },
  ): void {
    this.load(Method.get, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {

    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: { [key: string]: string }, endpoint: Endpoint): string {
    const urlOptions:{ [key: string]: string } = { ...this.options, ...options };
    let url:string = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key: string):void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: Method, endpoint:Endpoint, callback:(data:IDataAppViewNews | IDataAppViewSources) => void, options: { [key: string]: string } = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: IDataAppViewNews | IDataAppViewSources) => callback(data))
      .catch((err: Error) => console.error(err));
            
  }
}

export default Loader;
