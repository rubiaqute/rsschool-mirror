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
    callback = () => {
      console.error(`No callback for ${Method.get} response`);
    },
  ) {
    this.load(Method.get, endpoint, callback, options);
  }

  private errorHandler(res: Response) {

    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: { [key: string]: string }, endpoint: Endpoint) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: Method.get, endpoint:Endpoint, callback:(data:IDataAppViewNews | IDataAppViewSources) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: IDataAppViewNews | IDataAppViewSources) => {callback(data); console.log(data);})
      .catch((err) => console.error(err));
            
  }
}

export default Loader;
