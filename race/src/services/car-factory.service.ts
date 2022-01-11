import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

export interface Car {
  name:string,
  color:string

}
@Injectable({
  providedIn: 'root'
})
export class CarFactoryService {

  constructor(private server:ServerService) { }
  addCar(color:string): Car{
    const car:Car ={name: "Lada", color: color}
    return car;
  }
}
