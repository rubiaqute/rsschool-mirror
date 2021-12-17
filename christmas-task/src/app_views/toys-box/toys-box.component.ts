import { Component, Injectable, OnInit } from '@angular/core';
import { FavouriteComponent } from 'src/app_services/favourite/favourite.component';
import { FilterServiceComponent } from 'src/app_services/filter-service/filter-service.component';
import { SearchServiceComponent } from 'src/app_services/search-service/search-service.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';
import { toys, ToysUpdate } from '../../app_mocks/toys';
import { ToyCard, IToysAndSortingOrder } from '../../app_models/interfaces';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
  providers:[FavouriteComponent, ToysUpdate, FilterBarComponent, FilterServiceComponent, SearchServiceComponent]
})
export class ToysBoxComponent {
  toysOnScreen: ToyCard[] = this.toysUpdate.returnToys();
  toggle: boolean;
  sortingOrder: string = '';
  constructor(
    private toysUpdate:ToysUpdate,

  ) {
    this.toysOnScreen = this.toysUpdate.returnToys();
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
