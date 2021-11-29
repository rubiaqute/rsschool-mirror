import './sources.css';

interface IData {
    category : string | null,
    country: string | null,
    description: string | null,
    id: string | null,
    language: string | null,
    name: string | null,
    url: string |null,
}


class Sources {
    draw(data: Array<IData>) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');

        data.forEach((item : IData) => {
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
            (<HTMLElement>sourceClone).querySelector('.source__item-name').textContent = item.name;
            (<HTMLElement>sourceClone).querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
