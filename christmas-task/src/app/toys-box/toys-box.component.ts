import { Component, Input, Injectable } from '@angular/core';
import { toys, ToyCard } from './../toys';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
})
export class ToysBoxComponent {
  toysOnScreen: ToyCard[];
  constructor() {
    this.toysOnScreen = toys;
  }
  rewriteToys(toysNew: ToyCard[]) {
    this.toysOnScreen = toysNew;
    console.log(this.toysOnScreen)
  }
  returnToys() {
    return this.toysOnScreen;
  }
  // mix() {
  //   this.toys=this.toys.sort((el1:ToyCard,el2:ToyCard): number=>{return Number(el1.year) - Number(el2.year)} )
  // }
}
