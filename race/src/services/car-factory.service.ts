import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

export interface Car {
  name:string,
  color:string,
  id?:number
}
@Injectable({
  providedIn: 'root'
})
export class CarFactoryService {

  constructor() { }
  addCar(color:string): Car{
    const car:Car ={name: "Lada", color: color}
    return car;
  }
}
