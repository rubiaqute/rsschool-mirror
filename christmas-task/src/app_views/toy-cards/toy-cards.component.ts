import { Component, OnInit } from '@angular/core';
import { ToysBoxComponent } from '../toys-box/toys-box.component';

import { ToyCard } from '../../app_models/interfaces';
import { ChoosedServiceComponent } from 'src/app_services/choosed-service/choosed-service.component';


@Component({
  selector: 'app-toy-cards',
  templateUrl: './toy-cards.component.html',
  styleUrls: ['./toy-cards.component.scss'],
})
export class ToyCardsComponent implements OnInit{
  toys: ToyCard[]=[];
  constructor(
    private toysOnScreen: ToysBoxComponent,
    private choosedService:ChoosedServiceComponent
  ) {
    this.toys = this.updateToys()
  }
ngOnInit(): void {
  this.toys = this.updateToys()
}
  updateToys() {
    this.toys = this.toysOnScreen.returnToys();
    return this.toys; 
  }
  changeStylesIfChosen(toy:ToyCard) {
return this.choosedService.isChosen(toy);
  }
  addToFavourite(toy: ToyCard): void {
    this.choosedService.addToFavourites(toy);
  }

  isFavourite(favouriteValue: boolean): string {
    if (favouriteValue === false) return 'нет';
    else return 'да';
  }
}
