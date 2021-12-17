import { Component, Injectable, OnInit } from '@angular/core';
import { toys, ToysUpdate } from '../../app_mocks/toys';
import { ToyCard } from '../../app_models/interfaces';
import { StorageServiceComponent } from '../storage-service/storage-service.component';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})

export class FavouriteComponent implements OnInit{
  favourites: ToyCard[] = this.updateFavourites();
  constructor(private storageService:StorageServiceComponent, private toysUpdate:ToysUpdate) {}
  ngOnInit(): void {
      this.favourites = this.storageService.getObject('favouritesToys');
      if (this.favourites){
        this.favourites.forEach((el)=>{this.toysUpdate.changeFavourite(el)})
      }
  }
  addToFavourites(toy: ToyCard): boolean {
    if (!this.favourites.includes(toy)) {
      if (this.favourites.length + 1 > 20) {
        alert('Нет места для избранных игрушек');
        return false;
      } else {
        toy.favorite=true;
        this.favourites.push(toy);
        this.storageService.setObject('favouritesToys',this.favourites )
        return true;
      }
    } else {
      this.favourites.splice(this.favourites.indexOf(toy), 1);
      this.storageService.setObject('favouritesToys',this.favourites)
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
  
  updateFavourites(): ToyCard[] {
    this.favourites = [];
    this.toysUpdate.returnToys().forEach((toy: ToyCard) => {
      if (toy.favorite === true) this.favourites.push(toy);
    });
    return this.favourites;
  }
}
