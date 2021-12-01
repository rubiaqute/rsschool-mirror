import './sources.css';
import { IDataSources } from './../../app/interfaces';



class Sources {
  draw(data: Array<IDataSources>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');

    data.forEach((item : IDataSources): void => {
      const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
      (<HTMLElement>sourceClone).querySelector('.source__item-name').textContent = item.name;
      (<HTMLElement>sourceClone).querySelector('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources').append(fragment);
  }
}

export default Sources;
