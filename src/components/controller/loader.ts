import { IDataLoader } from './../app/interfaces';

class Loader {
  baseLink: string;

  options: {
    [key: string]: string
  };

  constructor(baseLink:string, options:{ [key: string]: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }:{
      endpoint: string;
      options?: { [key: string]: string };
    },
    callback = () => {
      console.error('No callback for GET response');
    },
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {

    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: { [key: string]: string }, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint:string, callback:(data:IDataLoader) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: IDataLoader) => {callback(data); console.log(data);})
      .catch((err) => console.error(err));
            
  }
}

export default Loader;
