import { Component, Input, Injectable } from '@angular/core';
import { toys, ToyCard } from './../toys';
import { FavouriteComponent } from '../favourite/favourite.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
})

export class ToysBoxComponent {

  @Input() toys: ToyCard[] = [];
  constructor (private favourites: FavouriteComponent) {
    this.toys=toys;
  }
  changeStylesforFavourites(toy: ToyCard):boolean {
    if (toy.favorite === true) return true;
    else return false;
  }
  addToFavourite(toy: ToyCard) :void {
    const check:boolean = this.favourites.addToFavourites(toy);
    if (check) toy.favorite = true;
    else toy.favorite = false;
  }
  getFavouritesLength() :string {
    return this.favourites.getFavouritesLength();
  }
  isFavourite(favouriteValue: boolean):string {
    if (favouriteValue===false) return "нет"
    else return "да"
  }
  rewriteToys(toysNew: ToyCard[]){
    this.toys = toysNew;
  }
  mix() {
    this.toys=this.toys.sort((el1:ToyCard,el2:ToyCard): number=>{return Number(el1.year) - Number(el2.year)} )
  }
}