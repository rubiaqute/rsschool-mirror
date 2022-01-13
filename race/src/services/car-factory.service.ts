import { Injectable } from '@angular/core';
import { carBrands, carModels, colorChars } from 'src/car-data';

export interface Car {
  name:string,
  color:string,
  id?:number
}
export interface Engine {
  velocity:number,
  distance:number,
}
export interface Success {
  success:boolean,
}
@Injectable({
  providedIn: 'root'
})
export class CarFactoryService {

  constructor() { }
  addCar(color:string, name:string): Car{
    const car:Car ={name: name, color: color}
    return car;
  }
  updateCar(updatedData:Car, carInBase: Car): Car {
    const newCar = carInBase;
    if (updatedData.color !== '') newCar.color = updatedData.color;
    if (updatedData.name !== '') newCar.name = updatedData.name;
    return newCar;
  }
  renderCars(quantity: number): Car[]{
    const newCars=[];
    for (let i=0; i< quantity; i +=1){
      const randomCarBrand = carBrands[Math.floor(Math.random()*carBrands.length)];
      const randomCarModel = carModels[Math.floor(Math.random()*carModels.length)];
      const randomColor = new Array(6).fill('F').map((char)=>{
        return colorChars[Math.round(Math.random()*(colorChars.length-1))]
      }).join('')
      console.log(randomColor)
      const newCar = {
        name: `${randomCarBrand} ${randomCarModel}`,
        color: `#${randomColor}`
      }
      newCars.push(newCar)
    }
    return newCars;
  }
}
