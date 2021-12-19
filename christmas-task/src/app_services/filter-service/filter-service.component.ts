import { Component, Input, OnInit } from '@angular/core';
import { toys } from '../../app_mocks/toys';
import {
  FilterPam,
  ToyCard,
  IRanges,
  IFilterObject,
} from '../../app_models/interfaces';
import { filterObject } from '../../app_mocks/filter';
import { Filter } from '../../app_models/enum';
import { StorageServiceComponent } from '../storage-service/storage-service.component';

@Component({
  selector: 'app-filter-service',
  templateUrl: './filter-service.component.html',
  styleUrls: ['./filter-service.component.scss'],
})
export class FilterServiceComponent implements OnInit {
  @Input() toysToFilter: ToyCard[];
  filterObject: IFilterObject;
  constructor(private storageService: StorageServiceComponent) {
    this.toysToFilter = toys;
    this.filterObject = this.getFilterObject();
  }
  ngOnInit(): void {
    this.toysToFilter = toys;
  }

  getFilterObject(): IFilterObject {
    if (this.storageService.getObject('filterObject'))
      return this.storageService.getObject('filterObject');
    else return filterObject;
  }
  filterAll(): ToyCard[] {
    let filterItems: ToyCard[] = this.toysToFilter;
    for (const [key, value] of Object.entries(this.getFilterObject())) {
      let filterItemsByParam: ToyCard[] = [];
      value.forEach((element: FilterPam) => {
        if (element.isOn === true) {
          filterItemsByParam = filterItemsByParam.concat(
            this.toysToFilter.filter((toy) => {
              const param = key.split('Filter')[0];
              return toy[param as keyof ToyCard] === element.value;
            })
          );
        }
      });
      if (filterItemsByParam.length > 0 && filterItems.length != 0) {
        filterItems = filterItems.concat(filterItemsByParam);
        if (filterItems.length != filterItemsByParam.length)
          filterItems = filterItems.filter((item, pos) => {
            return filterItems.indexOf(item) !== pos;
          });
      }
    }
    return filterItems;
  }
  checkFilterObject(): boolean {
    let flag: boolean = false;
    for (const [key, value] of Object.entries(this.filterObject)) {
      value.forEach((element: FilterPam) => {
        if (element.isOn === true) flag = true;
      });
    }
    return flag;
  }

  updateFilterObject(filter: Filter, param: FilterPam): ToyCard[] {
    if (this.filterObject[filter][param.id].isOn)
      this.filterObject[filter][param.id].isOn = false;
    else this.filterObject[filter][param.id].isOn = true;
    this.storageService.setObject('filterObject', this.filterObject);
    if (this.checkFilterObject()) return this.filterAll();
    else return this.toysToFilter;
  }
  removeFilterObject() {
    this.filterObject = filterObject;
  }
  filterByRange(rangeObject: IRanges[]): ToyCard[] {
    let toysToFilterByRange: ToyCard[] = [];
    if (this.checkFilterObject()) toysToFilterByRange = this.filterAll();
    else toysToFilterByRange = toys;
    rangeObject.forEach((rangeBar: IRanges) => {
      toysToFilterByRange = toysToFilterByRange.filter((el) => {
        return (
          Number(el[rangeBar.range as keyof ToyCard]) >= rangeBar.value &&
          Number(el[rangeBar.range as keyof ToyCard]) <= rangeBar.highValue
        );
      });
    });
    return toysToFilterByRange;
  }
}
