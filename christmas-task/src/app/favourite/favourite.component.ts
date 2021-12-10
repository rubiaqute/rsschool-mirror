import { Component, OnInit, Injectable, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
import { toys, ToyCard } from '../toys';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
  
})
@Injectable ({
  providedIn: 'root'
})
export class FavouriteComponent implements OnInit {
  favourites: ToyCard[] = this.updateFavourites();
  addToFavourites(toy:ToyCard) {
    if (this.favourites.length + 1 > 20){
      alert("Нет места для избранных игрушек");
      return false;
    }
    if (!this.favourites.includes(toy)){
    this.favourites.push(toy)
    return true;
    } else  {
      this.favourites.splice(this.favourites.indexOf(toy), 1);
      return false;
    }
  }
  getFavourites() {
    return this.favourites;
  }
  getFavouritesLength() {
    return String(this.favourites.length).padStart(2,"0");
  }
  // clearFavourites() {
  //   this.favourites = [];
  //   return this.favourites;
  // }
  constructor(private changeDetector: ChangeDetectorRef) {  
    
  }
  updateFavourites() {
    this.favourites=[];
    toys.forEach((toy:ToyCard)=>{
      console.log(this.favourites)
    if (toy.favorite===true) this.favourites.push(toy)
    })
    return this.favourites;
  }
  

  ngOnInit(): void {
    this.changeDetector.detectChanges();
    
  }

}
