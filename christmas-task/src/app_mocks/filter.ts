import { IShape, IColor, ISize, IFavorite } from "../app_models/interfaces";

export const shapes: IShape[] = [
  { id: 0, name: 'шар', svgName: 'ball', isOn: false },
  { id: 1, name: 'фигурка', svgName: 'toy', isOn: false },
  { id: 2, name: 'колокольчик', svgName: 'bell', isOn: false },
  { id: 3, name: 'шишка', svgName: 'cone', isOn: false },
  { id: 4, name: 'снежинка', svgName: 'snowflake', isOn: false },
];

export const colors: IColor[] = [
  { id: 0, name: 'белый', colorCode: 'white', isOn: false },
  { id: 1, name: 'желтый', colorCode: 'yellow', isOn: false },
  { id: 2, name: 'зелёный', colorCode: 'green', isOn: false },
  { id: 3, name: 'красный', colorCode: 'red', isOn: false },
  { id: 4, name: 'синий', colorCode: 'blue', isOn: false },
];
export const sizes: ISize[] = [
  { id: 0, name: 'большой', isOn: false },
  { id: 1, name: 'средний', isOn: false },
  { id: 2, name: 'малый', isOn: false },
];
export const favorites: IFavorite[] = [
  { id: 0, description:'Избранное', name: true, isOn: false },
  { id: 1, description:'Неизбранное', name: false, isOn: false },
];

export const filterObject = {
  shapeFilter: shapes,
  colorFilter: colors,
  sizeFilter: sizes,
  favoriteFilter: favorites,
};
