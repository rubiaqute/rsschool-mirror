import { Injectable } from '@angular/core';
import { carBrands, carModels, colorChars } from 'src/car-data';
import { Car } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export default class CarFactoryService {
  static addCar(color:string, name:string): Car {
    const car:Car = { name, color };
    return car;
  }

  static updateCar(updatedData:Car, carInBase: Car): Car {
    const newCar = carInBase;
    if (updatedData.color !== '') newCar.color = updatedData.color;
    if (updatedData.name !== '') newCar.name = updatedData.name;
    return newCar;
  }

  static renderCars(quantity: number): Car[] {
    const newCars = [];
    for (let i = 0; i < quantity; i += 1) {
      const randomCarBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
      const randomCarModel = carModels[Math.floor(Math.random() * carModels.length)];
      const randomColor = new Array(6).fill('F').map(() => colorChars[Math.round(Math.random() * (colorChars.length - 1))]).join('');
      const newCar = {
        name: `${randomCarBrand} ${randomCarModel}`,
        color: `#${randomColor}`,
      };
      newCars.push(newCar);
    }
    return newCars;
  }
}
