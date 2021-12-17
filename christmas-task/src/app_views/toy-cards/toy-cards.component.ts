import { Component, OnInit } from '@angular/core';
import { FavouriteComponent } from '../../app_services/favourite/favourite.component';
import { ToysBoxComponent } from '../toys-box/toys-box.component';

import { ToyCard } from '../../app_models/interfaces';
import { ToysUpdate } from 'src/app_mocks/toys';

@Component({
  selector: 'app-toy-cards',
  templateUrl: './toy-cards.component.html',
  styleUrls: ['./toy-cards.component.scss'],
})
export class ToyCardsComponent implements OnInit{
  toys: ToyCard[]=[];
  constructor(
    private favourites: FavouriteComponent,
    private toysOnScreen: ToysBoxComponent,
    private toysUpdate:ToysUpdate,
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
  changeStylesforFavourites(toy: ToyCard): boolean {
    if (toy.favorite === true) return true;
    else return false;
  }
  addToFavourite(toy: ToyCard): void {
    const check: boolean = this.favourites.addToFavourites(toy);
    if (check) toy.favorite = true;
    else toy.favorite = false;
    this.toysUpdate.changeFavourite(toy);
  }

  isFavourite(favouriteValue: boolean): string {
    if (favouriteValue === false) return 'нет';
    else return 'да';
  }
}
