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
  pageAmount = 1;
  totalAmountOfCars = 0;
  selectionMode = false;
  selectedId: number | undefined;

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
    this.selectionMode = true;
    this.selectedId = id;
  }
  isSelected(id: number | undefined) {
    return (this.selectedId === id && this.selectedId);
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
