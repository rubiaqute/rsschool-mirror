import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarFactoryService } from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-car-customization',
  templateUrl: './car-customization.component.html',
  styleUrls: ['./car-customization.component.scss']
})
export class CarCustomizationComponent {

@Output() onAddingCars = new EventEmitter<void>();
@Input() canChange!:boolean;
  constructor(private server:ServerService, private carService:CarFactoryService) { }
  colorChoice="#fff";
  nameChoice='';
  makeCar(){
    const car = this.carService.addCar(this.colorChoice, this.nameChoice);
    this.server
      .addCar(car)
      .subscribe((responce) => {
        this.onAddingCars.emit();
      });
      this.nameChoice='';
  }
  print(){
    console.log(this.colorChoice);
  }

}
