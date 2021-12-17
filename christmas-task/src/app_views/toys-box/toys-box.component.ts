import { Component, Injectable, OnInit } from '@angular/core';
import { FavouriteComponent } from 'src/app_services/favourite/favourite.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';
import { toys } from '../../app_mocks/toys';
import { ToyCard, IToysAndSortingOrder } from '../../app_models/interfaces';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
  providers:[FavouriteComponent]
})
export class ToysBoxComponent {
  toysOnScreen: ToyCard[] = toys;
  toggle: boolean;
  sortingOrder: string = '';
  constructor(
    private serviceStorage: StorageServiceComponent,
  ) {
    this.toysOnScreen = this.returnToys();
    this.toggle = Boolean(this.returnToys().length > 0);
  }
  rewriteToys(toysNew: ToyCard[]): void {
    this.toysOnScreen = toysNew;
    this.toggle = Boolean(this.returnToys().length > 0);
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
