import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Car,
  CarFactoryService,
} from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';
import { EngineStatus } from 'src/car-data';


interface IntervalAnimation {
  starttime: number | null;
  id: number;
  drivingMode:boolean;
}
interface Results {
  id:number,
  time: number,
}

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
  raceMode:boolean = false;
  carsArray: Car[] = [];
  pageNumber: number = 1;
  pageAmount: number = 1;
  totalAmountOfCars = 0;
  selectedId: number | undefined;
  CARS_TO_RENDER = 10;
  myReqArray: IntervalAnimation[] = [];
  showResultMessage:boolean = false;
  winner ={
    name:'',
    time:0
  }

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
    newCars.forEach((car) => this.makeCar(car));
  }


  move(id: number | undefined) {

    const promise:Promise<Results> = new Promise((resolve)=>{
      if (id) {
    const result:Results={id:id, time:0};
    let interval: IntervalAnimation;
    this.myReqArray[id] = { starttime: null, id: 0, drivingMode:true };
     this.server
        .switchEngine(id, EngineStatus.started)
        .subscribe((response) => {
          const time = Math.round(response.distance / response.velocity);
          interval = this.animation(id, time)!;
          this.server.switchEngineToDrive(id, EngineStatus.drive).subscribe(
            (response) =>{
              result.id = id;
              result.time = time
              resolve(result);
            },
            () => {
              window.cancelAnimationFrame(interval.id)
              if (this.raceMode){
              const driveModesArray:boolean[]=[];
              this.myReqArray[id].drivingMode = false;
              this.carsArray.forEach((car)=>{
               driveModesArray.push(this.myReqArray[car.id!].drivingMode);
              });
              if (driveModesArray.every((el)=>el ==false)) {
                result.id=-1;
                result.time = 0;
                resolve(result)
              }
            }
            },
          );
        });
      };
    })
    return promise;
  }
  animation(id: number, animationTime: number) {
    if (id) {
      const car = document.getElementById(`car-${id}`);
      const flag = document.getElementById(`flag-${id}`);
      const distance =
        flag!.getBoundingClientRect().left - car!.getBoundingClientRect().left;
      const myReq: IntervalAnimation = { starttime: null, id: 0, drivingMode:true };
      this.myReqArray[id] = myReq;
      function step(timestamp: number) {
        if (!myReq.starttime) myReq.starttime = timestamp;
        const time = timestamp - myReq.starttime;
        const passed = Math.round((time * distance) / animationTime!);
        car!.style.transform =
          'translateX(' + Math.min(passed, distance) + 'px)';
        if (passed < distance) {
          myReq.id = window.requestAnimationFrame(step);
        }
      }
      myReq.id = window.requestAnimationFrame(step);
      return myReq;
    }
    return;
  }
  isMoving(id:number|undefined){
    if (id){
    if (this.myReqArray[id]) return this.myReqArray[id].drivingMode;
    else return false;
    }
    else return false;

  }
  async startRace(){
    this.raceMode=true;
    const promises = this.carsArray.map((car)=> this.move(car.id))
    const winner = await Promise.race(promises);
    if (!winner) console.log("Nope")
    console.log(winner);
    this.showWinner(winner);

  }

  showWinner(winner:Results){
    if (winner.time){
    this.winner.name = this.carsArray.find((car)=> car.id==winner.id)!.name;
    this.winner.time = +(winner.time/1000).toFixed(2)
    }
    else this.winner.name = '';
    this.showResultMessage=true;

  }
  closeResultMessage(){
    this.showResultMessage = false;
    this.raceMode = false;
    this.allCarsBacktoStart();
  }
  allCarsBacktoStart(){
    this.showResultMessage = false;
    this.carsArray.forEach((car)=>{
      if (this.myReqArray[car.id!]) {
        window.cancelAnimationFrame(this.myReqArray[car.id!].id);
        this.myReqArray[car.id!].drivingMode=false;
      }
      const carImage = document.getElementById(`car-${car.id}`);
      carImage!.style.transform = 'translateX(0)';
    }
    )
  }
  stop(id: number | undefined) {
    if (id) {
      const car = document.getElementById(`car-${id}`);
      this.server
        .switchEngineToDrive(id, EngineStatus.stopped)
        .subscribe((response) => {
          window.cancelAnimationFrame(this.myReqArray[id].id);
          this.myReqArray[id].drivingMode=false;
          car!.style.transform = 'translateX(0)';
        });
    }
  }

}
