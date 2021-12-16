import { IShape, IColor, ISize, IFavorite, IFilterObject } from "../app_models/interfaces";

export const shapes: IShape[] = [
  { id: 0, type:"shape", value: 'шар', svgName: 'ball', isOn: false },
  { id: 1, type:"shape", value: 'фигурка', svgName: 'toy', isOn: false },
  { id: 2, type:"shape", value: 'колокольчик', svgName: 'bell', isOn: false },
  { id: 3, type:"shape", value: 'шишка', svgName: 'cone', isOn: false },
  { id: 4, type:"shape", value: 'снежинка', svgName: 'snowflake', isOn: false },
];

export const colors: IColor[] = [
  { id: 0, type: "color", value: 'белый', colorCode: 'white', isOn: false },
  { id: 1, type: "color", value: 'желтый', colorCode: 'yellow', isOn: false },
  { id: 2, type: "color", value: 'зелёный', colorCode: 'green', isOn: false },
  { id: 3, type: "color", value: 'красный', colorCode: 'red', isOn: false },
  { id: 4, type: "color", value: 'синий', colorCode: 'blue', isOn: false },
];
export const sizes: ISize[] = [
  { id: 0, type: "size", value: 'большой', isOn: false },
  { id: 1, type: "size", value: 'средний', isOn: false },
  { id: 2, type: "size", value: 'малый', isOn: false },
];
export const favorites: IFavorite[] = [
  { id: 0, type: "favorite", description:'Избранное', value: true, isOn: false },
  { id: 1, type: "favorite", description:'Неизбранное', value: false, isOn: false },
];
export const filterObject:IFilterObject = {
  shapeFilter: shapes,
  colorFilter: colors,
  sizeFilter: sizes,
  favoriteFilter: favorites,
};
