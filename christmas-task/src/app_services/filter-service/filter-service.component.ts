import { Component, Injectable, Input } from '@angular/core';
import { toys } from '../../app_mocks/toys';
import { FilterPam, ToyCard } from '../../app_models/interfaces';
import { filterObject } from '../../app_mocks/filter';
import { Filter } from '../../app_models/enum';

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
  filterObject;
  constructor() {
    this.toysToFilter = toys;
    this.filterObject = filterObject;
  }

  filterAll(): ToyCard[] {
    let filterItems: ToyCard[] = [];
    for (const [key, value] of Object.entries(this.filterObject)) {
      console.log(value);
      let filterItemsByParam: ToyCard[] = [];
      value.forEach((element) => {
        if (element.isOn === true) {
          filterItemsByParam = filterItemsByParam.concat(
            this.toysToFilter.filter((toy) => {
              const param = key.split('Filter')[0];
              return toy[param as keyof ToyCard] === element.name;
            })
          );
        }
      });
      if (filterItemsByParam.length > 0) {
        filterItems = filterItems.concat(filterItemsByParam);
        if (filterItems.length != filterItemsByParam.length)
          filterItems = filterItems.filter((item, pos) => {
            return filterItems.indexOf(item) !== pos;
          });
      }
    }
    console.log(filterItems);
    if (filterItems.length === 0)
      alert('Для данных фильтров ничего не найдено!');
    return filterItems;
  }
  checkFilterObject(): boolean {
    let flag: boolean = false;
    for (const [key, value] of Object.entries(this.filterObject)) {
      value.forEach((element) => {
        if (element.isOn === true) flag = true;
      });
    }
    return flag;
  }

  updateFilterObject(filter: Filter, param: FilterPam): ToyCard[] {
    if (this.filterObject[filter][param.id].isOn)
      this.filterObject[filter][param.id].isOn = false;
    else this.filterObject[filter][param.id].isOn = true;
    if (this.checkFilterObject()) return this.filterAll();
    else return this.toysToFilter;
  }
}
