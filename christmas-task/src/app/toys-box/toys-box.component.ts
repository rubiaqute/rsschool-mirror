import { Component, OnInit } from '@angular/core';
import { toys, ToyCard } from './../toys';


@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss']
})
export class ToysBoxComponent {
  toys=toys;
  isFavourite(favouriteValue: boolean):string {
    if (favouriteValue===false) return "нет"
    else return "да"
  }
  mix() {
    this.toys=toys.sort((el1:ToyCard,el2:ToyCard): number=>{return Number(el1.year) - Number(el2.year)} )
  }
}
