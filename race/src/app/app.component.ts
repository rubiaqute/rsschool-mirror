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
  carsOnScreen: Car[] = [];
  pageNumber = 1;
  totalAmountOfCars = 0;

  ngOnInit(): void {
    this.getCarsOnScreen(this.pageNumber);
    this.getTotalAmountOfCars();
  }
  getTotalAmountOfCars() {
    this.server.getAmountOfCars().subscribe((responce) => {
      this.totalAmountOfCars = responce;
    });
  }
  returnCarColor(color: string): { fill: string } {
    return {
      fill: `${color}`,
    };
  }
  makeCar() {
    const car = this.carService.addCar('#ccc');
    this.server
      .addCar(car)
      .subscribe((responce) => this.getCarsOnScreen(this.pageNumber));
  }
  getCarsOnScreen(page: number) {
    this.server.fetchCarsOnScreen(page).subscribe((response) => {
      this.carsArray = response;
    });
  }

  deleteCar(id: number | undefined) {
    if (id) {
      this.server.deleteCar(id).subscribe((response) => {
        this.getCarsOnScreen(this.pageNumber);
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
}
