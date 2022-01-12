import { Component, OnInit } from '@angular/core';
import { Car, CarFactoryService } from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private carService: CarFactoryService,
    private server: ServerService
  ) {}

  carsArray: Car[] = [];
  pageNumber: number = 1;
  pageAmount: number = 1;
  totalAmountOfCars = 0;
  selectedId: number | undefined;
  CARS_TO_RENDER = 10;
  // CARS_TO_RENDER = 100;

  ngOnInit(): void {
    this.getCarsOnScreen(this.pageNumber);
  }
  getTotalAmountOfCars() {
    this.server.getAmountOfCars().subscribe((response) => {
      this.totalAmountOfCars = response;
    });
  }
  updatePageNumber() {
    this.server.getAmountOfCars().subscribe((response) => {
      const newPageNumber = Math.ceil(
        response / this.server.MAX_AMOUNT_OF_CARS_PER_PAGE
      );
      this.pageAmount = newPageNumber;
    });
  }
  returnCarColor(color: string): { fill: string } {
    return {
      fill: `${color}`,
    };
  }
  getCarsOnScreen(page: number) {
    this.server.fetchCarsOnScreen(page).subscribe((response) => {
      this.carsArray = response;
    });
    this.getTotalAmountOfCars();
    this.updatePageNumber();
  }
  changeCar(id: number | undefined) {
    this.selectedId = id;
  }
  isSelected(id: number | undefined) {
    return this.selectedId === id && this.selectedId;
  }
  deleteCar(id: number | undefined) {
    if (id) {
      this.server.deleteCar(id).subscribe((response) => {
        this.getCarsOnScreen(this.pageNumber);
      });
    }
    if (this.selectedId == id) this.selectedId = undefined;
  }
  updateCar(updatedData: Car) {
    if (this.selectedId) {
      let carForUpdate: Car = updatedData;
      this.server.getCar(this.selectedId).subscribe((response) => {
        carForUpdate = this.carService.updateCar(updatedData, response);
        this.server.updateCar(carForUpdate, this.selectedId!).subscribe(() => {
          this.getCarsOnScreen(this.pageNumber);
        });
        this.selectedId = undefined;
      });
    }
  }

  nextPage() {
    this.pageNumber++;
    this.getCarsOnScreen(this.pageNumber);
  }
  previousPage() {
    this.pageNumber--;
    this.getCarsOnScreen(this.pageNumber);
  }
  makeCar(newObject: Car) {
    const car = this.carService.addCar(newObject.color, newObject.name);
    this.server.addCar(car).subscribe((response) => {
      this.getCarsOnScreen(this.pageNumber);
    });
  }
  async renderCars() {
    const newCars = this.carService.renderCars(this.CARS_TO_RENDER);
    newCars.forEach((car)=> this.makeCar(car));
  }
}
