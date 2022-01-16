import { Component, OnInit } from '@angular/core';
import { CarFactoryService } from 'src/services/car-factory.service';
import { ServerService } from 'src/services/server.service';
import { EngineStatus } from 'src/car-data';
import {
  Car,
  CustomizationInputs,
  IntervalAnimation,
  Results,
  SortingData,
  SortItem,
  SortOrder,
  WinnerPageState,
} from 'src/models';
import { WinnersComponent } from 'src/views/winners/winners.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private carService: CarFactoryService,
    private server: ServerService,
    private winnerBase: WinnersComponent
  ) {}
  winnersPage = false;
  raceMode: boolean = false;
  carsArray: Car[] = [];
  pageNumber: number = 1;
  pageAmount: number = 1;
  totalAmountOfCars = 0;
  selectedId: number | undefined;
  CARS_TO_RENDER = 100;
  myReqArray: IntervalAnimation[] = [];
  showResultMessage: boolean = false;
  abortionFlag: boolean = false;
  pending=false;
  winnerPageState: WinnerPageState = {
    pageNumber: 1,
    sortingBy: SortItem.byId,
    sortingOrder: SortOrder.AtoZ,
  };
  customizationInputs: CustomizationInputs = {
    colorChoice: '#fff',
    nameChoice: '',
    updateColorChoice: '',
    updateNameChoice: '',
  };
  winner = {
    id: 0,
    name: '',
    time: 0,
  };

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
      this.allCarsBacktoStart();
      this.server.deleteCar(id).subscribe((response) => {
        this.getCarsOnScreen(this.pageNumber);
        this.server.deleteWinner(id).subscribe(
          () => {},
          () =>
            console.log(
              "This error means that deleted car is absent in winners list. It's OK. Everything is under control."
            )
        );
      });
    }
    if (this.selectedId == id) this.selectedId = undefined;
  }
  updateCar(updatedData: Car) {
    if (this.selectedId) {
      this.allCarsBacktoStart();
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
    this.allCarsBacktoStart();
    this.pageNumber++;
    this.getCarsOnScreen(this.pageNumber);
  }
  previousPage() {
    this.allCarsBacktoStart();
    this.pageNumber--;
    this.getCarsOnScreen(this.pageNumber);
  }
  makeCar(newObject: Car) {
    this.allCarsBacktoStart();
    const car = this.carService.addCar(newObject.color, newObject.name);
    this.server.addCar(car).subscribe((response) => {
      this.getCarsOnScreen(this.pageNumber);
    });
  }
  async renderCars() {
    this.allCarsBacktoStart();
    const newCars = this.carService.renderCars(this.CARS_TO_RENDER);
    newCars.forEach((car) => this.makeCar(car));
  }

  move(id: number | undefined) {
    const promise: Promise<Results> = new Promise((resolve) => {
      if (id) {
        // this.abortionFlag = false;
        // if (this.raceMode) this.abortionFlag = true;
        const result: Results = { id: id, time: 0 };
        let interval: IntervalAnimation;
        this.myReqArray[id] = { starttime: null, id: 0, drivingMode: true };
        this.server
          .switchEngine(id, EngineStatus.started)
          .subscribe((response) => {
            if (!this.abortionFlag) {
              const time = Math.round(response.distance / response.velocity);
              interval = this.animation(id, time)!;
              this.server.switchEngineToDrive(id, EngineStatus.drive).subscribe(
                (response) => {
                  result.id = id;

                  result.time = time;
                  resolve(result);
                },
                (error) => {
                  if (error.status == 404)
                    console.log(
                      `This error means that you start race too quickly after reset, but it's ok. Everything is under control`
                    );
                  else if (error.status == 429)
                    console.log(
                      `This error means that you start race too quickly after reset, but it's ok. Everything is under control`
                    );
                  else
                    console.log(
                      `This error means that this car was broken. It can't drive anymore...`
                    );
                  window.cancelAnimationFrame(interval.id);
                  if (this.raceMode) {
                    this.myReqArray[id].drivingMode = false;
                    if (this.checkIfAllAreBroken()) {
                      result.id = -1;
                      result.time = 0;
                      resolve(result);
                    }
                  }
                }
              );
            }
          });
      }
    });
    return promise;
  }
  checkIfAllAreBroken() {
    const driveModesArray: boolean[] = [];
    this.carsArray.forEach((car) => {
      driveModesArray.push(this.myReqArray[car.id!].drivingMode);
    });
    return driveModesArray.every((el) => el == false);
  }

  animation(id: number, animationTime: number) {
    if (id) {
      const car = document.getElementById(`car-${id}`);
      const flag = document.getElementById(`flag-${id}`);
      const distance =
        flag!.getBoundingClientRect().left - car!.getBoundingClientRect().left;
      const myReq: IntervalAnimation = {
        starttime: null,
        id: 0,
        drivingMode: true,
      };

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
  isMoving(id: number | undefined) {
    if (id) {
      if (this.myReqArray[id]) return this.myReqArray[id].drivingMode;
      else return false;
    } else return false;
  }
  async startRace() {
    this.allCarsBacktoStart();
    this.selectedId = undefined;
    this.raceMode = true;
    this.pending=true;
    setTimeout(()=> this.pending=false, 500)
    const promises = this.carsArray.map((car) => this.move(car.id));
    const winner = await Promise.race(promises);
    if (this.raceMode && !this.abortionFlag) {
      if (winner.id > 0) this.winnerBase.addWinner(winner);

      this.showWinner(winner);
    }
    this.abortionFlag = false;
  }

  showWinner(winner: Results) {
    this.abortionFlag = false;
    if (winner.time) {
      this.winner.name = this.carsArray.find(
        (car) => car.id == winner.id
      )!.name;
      this.winner.time = +(winner.time / 1000).toFixed(2);
    } else this.winner.name = '';
    this.showResultMessage = true;
  }
  closeResultMessage() {
    this.showResultMessage = false;
    this.raceMode = false;
    this.allCarsBacktoStart();
  }
  resetRace() {
    if (this.raceMode) this.abortionFlag = true;
    this.allCarsBacktoStart();
  }
  allCarsBacktoStart() {
    this.raceMode = false;
    this.showResultMessage = false;
    this.carsArray.forEach((car) => {
      if (this.myReqArray[car.id!]) {
        window.cancelAnimationFrame(this.myReqArray[car.id!].id);
        this.myReqArray[car.id!].drivingMode = false;
      }
      const carImage = document.getElementById(`car-${car.id}`);
      if (carImage) carImage.style.transform = 'translateX(0)';
    });
  }
  stop(id: number | undefined) {
    if (id) {
      const car = document.getElementById(`car-${id}`);
      this.server
        .switchEngineToDrive(id, EngineStatus.stopped)
        .subscribe((response) => {
          window.cancelAnimationFrame(this.myReqArray[id].id);
          this.myReqArray[id].drivingMode = false;
          car!.style.transform = 'translateX(0)';
        });
    }
  }
  changeWinnersPage(page: number) {
    this.winnerPageState.pageNumber = page;
  }
  changeWinnersSort(sortData: SortingData) {
    this.winnerPageState.sortingBy = sortData[0];
    this.winnerPageState.sortingOrder = sortData[1];
  }
  updateCustomizationInputs(newObject: CustomizationInputs) {
    for (let key in newObject) {
      this.customizationInputs[key as keyof CustomizationInputs] =
        newObject[key as keyof CustomizationInputs];
    }
  }
}
