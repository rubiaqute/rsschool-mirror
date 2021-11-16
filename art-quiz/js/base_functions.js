import { game } from './navigation_functions.js';

export function createNodetoDom(element, ...classes) {
  const node = document.createElement(element);
  node.className = classes;
  return node;
}
export async function getImageData() {
  const images = './js/image_data.json';
  const res = await fetch(images);
  const data = await res.json();
  await data;
  return data;
}
export function getImageSrc(i) {
  const src = `./image-data/img/${i}.jpg`;
  return src;
}
export async function getName(id) {
  const data = await getImageData();
  await data.images[id].name;
  return data.images[id].name;
}

export async function getAuthor(id) {
  const data = await getImageData();
  await data.images[id].author;
  return data.images[id].author;
}
export async function getYear(id) {
  const data = await getImageData();
  await data.images[id].year;
  return data.images[id].year;
}

export function createModalWrapper(template) {
  const modalContainer = createNodetoDom('div', 'modal-container');
  modalContainer.innerHTML = template;
  const overlay = createNodetoDom('div', 'overlay');
  overlay.append(modalContainer);
  game.append(overlay);
  setTimeout(() => modalContainer.classList.add('animated'), 500);
}
