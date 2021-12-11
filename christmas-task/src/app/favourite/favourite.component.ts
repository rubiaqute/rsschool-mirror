import {
  Component,
  Injectable,
} from '@angular/core';
import { toys, ToyCard } from '../toys';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class FavouriteComponent {
  favourites: ToyCard[] = this.updateFavourites();
  addToFavourites(toy: ToyCard): boolean {
    if (!this.favourites.includes(toy)) {
      if (this.favourites.length + 1 > 20) {
        alert('Нет места для избранных игрушек');
        return false;
      } else {
        this.favourites.push(toy);
        return true;
      }
    } else {
      this.favourites.splice(this.favourites.indexOf(toy), 1);
      return false;
    }
  }
  getFavourites(): ToyCard[] {
    return this.favourites;
  }
  getFavouritesLength(): string {
    return String(this.updateFavourites().length).padStart(2, '0');
  }
  // clearFavourites() {
  //   this.favourites = [];
  //   return this.favourites;
  // }
  constructor() {}
  updateFavourites(): ToyCard[] {
    this.favourites = [];
    toys.forEach((toy: ToyCard) => {
      if (toy.favorite === true) this.favourites.push(toy);
    });
    return this.favourites;
  }

}
