import { Component, Injectable, OnInit } from '@angular/core';
import { FavouriteComponent } from 'src/app_services/favourite/favourite.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';
import { toys, ToysUpdate } from '../../app_mocks/toys';
import { ToyCard, IToysAndSortingOrder } from '../../app_models/interfaces';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toys-box',
  templateUrl: './toys-box.component.html',
  styleUrls: ['./toys-box.component.scss'],
  providers:[FavouriteComponent, ToysUpdate]
})
export class ToysBoxComponent {
  toysOnScreen: ToyCard[] = this.toysUpdate.returnToys();
  toggle: boolean;
  sortingOrder: string = '';
  constructor(
    private serviceStorage: StorageServiceComponent,
    private toysUpdate:ToysUpdate
  ) {
    this.toysOnScreen = this.toysUpdate.returnToys();
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
