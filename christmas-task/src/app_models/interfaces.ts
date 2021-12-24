import { Range } from './enum';
export type FilterPam = IShape | IColor | ISize | IFavorite;
export interface ICard{
  num: string;
}
export interface ToyCard {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
export interface ISettings {
  type: string;
  isOn: boolean;
}
export interface ICoordinates{
  point:string;
  x:number;
  y:number;
}
export interface IFilterObject {
  shapeFilter: IShape[];
  colorFilter: IColor[];
  sizeFilter: ISize[];
  favoriteFilter: IFavorite[];
}
export interface IToysAndSortingOrder {
  toys: ToyCard[];
  sortingOrder: string;
}
export interface IRanges {
  range: Range;
  value: number;
  highValue: number;
}
export interface IFilterByCheckbox {
  id: number;
  type: string;
  isOn: boolean;
}
export interface IShape extends IFilterByCheckbox {
  svgName: string;
  value: string;
}
export interface IFavorite extends IFilterByCheckbox {
  description: string;
  value: boolean;
  svgName: string;
}

export interface ISize extends IFilterByCheckbox {
  value: string;
  svgName: string;
}
export interface IColor extends IFilterByCheckbox {
  colorCode: string;
  value: string;
}
