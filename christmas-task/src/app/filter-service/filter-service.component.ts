import { Component, Injectable, Input } from '@angular/core';
import { IShape, ToyCard, toys } from '../toys';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-filter-service',
  templateUrl: './filter-service.component.html',
  styleUrls: ['./filter-service.component.scss'],
})
export class FilterServiceComponent {
  @Input() toysToFilter: ToyCard[];
  constructor() {
    this.toysToFilter = toys;
  }

  filterBy(param: IShape): ToyCard[] {
    const filterlItems = this.toysToFilter.filter((toy) => {
      return toy.shape === param.shape;
    });
    return filterlItems;
  }
}
