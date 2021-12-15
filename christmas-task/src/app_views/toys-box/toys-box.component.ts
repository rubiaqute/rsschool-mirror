import { Component, Injectable } from '@angular/core';
import { toys } from '../../app_mocks/toys';
import { ToyCard, IToysAndSortingOrder } from '../../app_models/interfaces';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
})
export class ToysBoxComponent {
  toysOnScreen: ToyCard[]= toys;
  toggle: boolean;
  sortingOrder:string='';
  constructor() {
    this.toysOnScreen = this.returnToys(); 
    this.toggle = Boolean(this.returnToys().length>0);
  }
  
  rewriteToys(toysNew: ToyCard[]) {
    this.toysOnScreen = toysNew;
    this.toggle = Boolean(this.returnToys().length>0);
  }
  rewriteToysAndSortingOrder(ToysAndSortingOrder:IToysAndSortingOrder){
    this.toysOnScreen = ToysAndSortingOrder.toys;
    this.sortingOrder = ToysAndSortingOrder.sortingOrder;
    this.toggle = Boolean(this.returnToys().length>0);
  }
  
  returnToys() {
    return this.toysOnScreen;
  }
  // mix() {
  //   this.toys=this.toys.sort((el1:ToyCard,el2:ToyCard): number=>{return Number(el1.year) - Number(el2.year)} )
  // }
}
