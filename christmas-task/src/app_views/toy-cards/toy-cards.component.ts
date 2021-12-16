import { Component } from '@angular/core';
import { FavouriteComponent } from '../../app_services/favourite/favourite.component';
import { ToysBoxComponent } from '../toys-box/toys-box.component';

import { ToyCard } from '../../app_models/interfaces';

@Component({
  selector: 'app-toy-cards',
  templateUrl: './toy-cards.component.html',
  styleUrls: ['./toy-cards.component.scss'],
})
export class ToyCardsComponent {
  toys: ToyCard[] = this.updateToys();
  constructor(
    private favourites: FavouriteComponent,
    private toysOnScreen: ToysBoxComponent
  ) {}
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
  }

  isFavourite(favouriteValue: boolean): string {
    if (favouriteValue === false) return 'нет';
    else return 'да';
  }
}
