export type FilterPam = IShape| IColor;
export interface ToyCard {
  num:string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
}
export interface IShape {
  id: number,
  name: string,
  svgName: string,
  isOn:boolean
}
export interface IColor {
  id: number,
  name: string,
  colorCode: string,
  isOn: boolean
}