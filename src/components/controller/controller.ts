import AppLoader from './appLoader';
import { IDataAppViewSources, IDataAppViewNews } from './../app/interfaces';
import { Endpoint } from './../app/enum';

class AppController extends AppLoader {
  getSources(callback: (data?:IDataAppViewSources) => void):void {
    super.getResp(
      {
        endpoint: Endpoint.sources,
      },
      callback,
    );
  }

  getNews(e: Event, callback:(data?:IDataAppViewNews) => void): void {
    let target:HTMLElement = e.target as HTMLElement;
    const newsContainer:HTMLElement = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId: string = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: Endpoint.everything,
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
