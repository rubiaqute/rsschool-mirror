import { Component, Injectable, OnInit } from '@angular/core';
import { FilterServiceComponent } from '../../app_services/filter-service/filter-service.component';
import { SearchServiceComponent } from '../../app_services/search-service/search-service.component';
import { toys } from '../../app_mocks/toys';
import { ToyCard, IToysAndSortingOrder } from '../../app_models/interfaces';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { ChoosedServiceComponent } from 'src/app_services/choosed-service/choosed-service.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
  providers:[FilterBarComponent, FilterServiceComponent, SearchServiceComponent, ChoosedServiceComponent]
})
export class ToysBoxComponent {
  toysOnScreen: ToyCard[] = toys;
  toggle: boolean;
  sortingOrder: string = '';
  constructor(
    

  ) {
    this.toysOnScreen = toys;
    this.toggle = Boolean(this.returnToys().length > 0);
  }
  rewriteToys(toysNew: ToyCard[]): void {
    this.toysOnScreen = toysNew;
    this.toggle = Boolean(this.returnToys().length > 0);
  }
  rewriteToysToInput(toysNew: ToyCard[]){
    this.toysOnScreen = toysNew;
    // this.filter.ngOnChanges();
  }
  rewriteToysAndSortingOrder(ToysAndSortingOrder: IToysAndSortingOrder): void {
    this.toysOnScreen = ToysAndSortingOrder.toys;
    this.sortingOrder = ToysAndSortingOrder.sortingOrder;
    this.toggle = Boolean(this.returnToys().length > 0);
  }

  returnToys(): ToyCard[] {
    return this.toysOnScreen;
  }
}
