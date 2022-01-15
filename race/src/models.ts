export interface Winner {
  id: number,
  wins: number,
  time: number,
  color?:string,
  name?:string
}
export enum SortItem {
  byId='id',
  byWins = 'wins',
  byTime = 'time'
}
export enum SortOrder {
  AtoZ = 'ASC',
  ZtoA = 'DESC'
}
export interface IntervalAnimation {
  starttime: number | null;
  id: number;
  drivingMode: boolean;
}
export interface Results {
  id: number;
  time: number;
}
export interface Car {
  name:string,
  color:string,
  id?:number,
}
export interface Engine {
  velocity:number,
  distance:number,
}
export interface Success {
  success:boolean,
}
export interface WinnerPageState {
  pageNumber:number;
  sortingBy: SortItem;
  sortingOrder: SortOrder;
}
export const sorting:SortingData[] =[
  [SortItem.byId, SortOrder.AtoZ],
  [SortItem.byId, SortOrder.ZtoA],
  [SortItem.byWins, SortOrder.AtoZ],
  [SortItem.byWins, SortOrder.ZtoA],
  [SortItem.byTime, SortOrder.AtoZ],
  [SortItem.byTime, SortOrder.ZtoA],
]
export type SortingData =[SortItem, SortOrder]

