import { ICard, ICoordinates, ISettings } from 'src/app_models/interfaces';

export const toysToHangLength: number = 20;
export const treesImages: ICard[] = [
  { num: '1' },
  { num: '2' },
  { num: '3' },
  { num: '4' },
  { num: '5' },
  { num: '6' },
];
export const bgImages: ICard[] = [
  { num: '1' },
  { num: '2' },
  { num: '3' },
  { num: '4' },
  { num: '5' },
  { num: '6' },
  { num: '7' },
  { num: '8' },
  { num: '9' },
  { num: '10' },
];
export const coordinatesBasic: ICoordinates[] = [
  { point: '1', x: 94, y: 684 },
  { point: '2', x: 420, y: 684 },
  { point: '3', x: 498, y: 560 },
  { point: '4', x: 257, y: 15 },
  { point: '5', x: 5, y: 560 },
];
export const settings: ISettings[] = [
  { type: 'music', isOn: false },
  { type: 'snow', isOn: false },
];
