import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/models';
import { CarFactoryService } from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-car-customization',
  templateUrl: './car-customization.component.html',
  styleUrls: ['./car-customization.component.scss'],
})
export class CarCustomizationComponent {
  @Output() onAddingCars = new EventEmitter<Car>();
  @Output() onUpdatingCar = new EventEmitter<Car>();
  @Input() carForUpdate!: number | undefined;
  @Input() isAvailable:boolean | undefined;
  constructor(
    private server: ServerService,
    private carService: CarFactoryService
  ) {}
  colorChoice = '#fff';
  nameChoice = '';
  updateColorChoice = '';
  updateNameChoice = '';

  makeCar() {
    this.onAddingCars.emit({ color: this.colorChoice, name: this.nameChoice });
    this.nameChoice = '';
  }
  updateCar() {
    this.onUpdatingCar.emit({
      color: this.updateColorChoice,
      name: this.updateNameChoice,
    });
    this.updateNameChoice = '';
    this.updateColorChoice = '';
  }
}
