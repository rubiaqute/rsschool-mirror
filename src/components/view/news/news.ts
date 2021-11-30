import './news.css';
import {IDataNews, INews} from './../../app/interfaces'


class News {
    draw(data: Array<IDataNews>) {
        const news: Array<IDataNews> = data.length >= 10 ? data.filter((_item:IDataNews, idx: number) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp');
        news.forEach((item, idx) => {
            const newsClone: Node = newsItemTemp.content.cloneNode(true);

            if (idx % 2) (<HTMLElement>newsClone).querySelector('.news__item').classList.add('alt');

            (<HTMLElement>newsClone).querySelector<HTMLElement>('.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (<HTMLElement>newsClone).querySelector('.news__meta-author').textContent = item.author || item.source.name;
            (<HTMLElement>newsClone).querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

                (<HTMLElement>newsClone).querySelector('.news__description-title').textContent = item.title;
                (<HTMLElement>newsClone).querySelector('.news__description-source').textContent = item.source.name;
                (<HTMLElement>newsClone).querySelector('.news__description-content').textContent = item.description;
                (<HTMLElement>newsClone).querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
