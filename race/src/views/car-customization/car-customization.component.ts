import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { Car, CustomizationInputs } from 'src/models/models';
import CarFactoryService from 'src/services/car-factory.service';
import ServerService from 'src/services/server.service';

@Component({
  selector: 'app-car-customization',
  templateUrl: './car-customization.component.html',
  styleUrls: ['./car-customization.component.scss'],
})
export default class CarCustomizationComponent implements OnInit {
  @Output() byAddingCars = new EventEmitter<Car>();

  @Output() byCustomizationInput = new EventEmitter<CustomizationInputs>();

  @Output() byUpdatingCar = new EventEmitter<Car>();

  @Input() carForUpdate!: number | undefined;

  @Input() isAvailable: boolean | undefined;

  @Input() customizationObject!: CustomizationInputs;

  constructor(
    private server: ServerService,
    private carService: CarFactoryService,
  ) {}

  ngOnInit(): void {
    this.colorChoice = this.customizationObject.colorChoice;
    this.nameChoice = this.customizationObject.nameChoice;
    this.updateColorChoice = this.customizationObject.updateColorChoice;
    this.updateNameChoice = this.customizationObject.updateNameChoice;
  }

  colorChoice!: string;

  nameChoice!: string;

  updateColorChoice!: string;

  updateNameChoice!: string;

  makeCar() {
    this.byAddingCars.emit({ color: this.colorChoice, name: this.nameChoice });
    this.nameChoice = '';
    this.transmitData();
  }

  updateCar() {
    this.byUpdatingCar.emit({
      color: this.updateColorChoice,
      name: this.updateNameChoice,
    });
    this.updateNameChoice = '';
    // this.updateColorChoice = '';
    this.transmitData();
  }

  transmitData() {
    const newObject: CustomizationInputs = {
      colorChoice: this.colorChoice,
      nameChoice: this.nameChoice,
      updateColorChoice: this.updateColorChoice,
      updateNameChoice: this.updateNameChoice,
    };
    this.byCustomizationInput.emit(newObject);
  }
}
