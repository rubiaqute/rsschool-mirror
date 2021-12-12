import { Component, Injectable } from '@angular/core';
import { toys } from '../../app_mocks/toys';
import { ToyCard } from '../../app_models/interfaces';

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
  }
  returnToys() {
    return this.toysOnScreen;
  }
  // mix() {
  //   this.toys=this.toys.sort((el1:ToyCard,el2:ToyCard): number=>{return Number(el1.year) - Number(el2.year)} )
  // }
}
