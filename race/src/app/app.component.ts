import { Component, OnInit } from '@angular/core';
import { Car, CarFactoryService } from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private carService:CarFactoryService,
    private server:ServerService){}

  carsArray:Car[] = [];

  ngOnInit(): void {
    this.getCars()
  }

  returnCarColor(color: string): {fill: string } {
    return {
      fill: `${color}`,
    };
  }
  makeCar(){
    const car = this.carService.addCar('#ccc');
    this.server.addCar(car).subscribe((responce)=> this.carsArray.push(responce))
  }
  getCars(){
    this.server.fetchCars().subscribe((response)=> {
      this.carsArray = this.carsArray.concat(response);
    })
  }
}
