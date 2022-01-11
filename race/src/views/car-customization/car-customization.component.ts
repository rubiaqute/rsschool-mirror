import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarFactoryService } from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-car-customization',
  templateUrl: './car-customization.component.html',
  styleUrls: ['./car-customization.component.scss']
})
export class CarCustomizationComponent {

@Output() onAddingCars = new EventEmitter<void>();
  constructor(private server:ServerService, private carService:CarFactoryService) { }
  makeCar(){
    const car = this.carService.addCar('#676890');
    this.server
      .addCar(car)
      .subscribe((responce) => {
        this.onAddingCars.emit();
        console.log('Передача')
      });
  }

}
