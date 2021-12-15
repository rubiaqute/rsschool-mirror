import { Component, Injectable, Input } from '@angular/core';
import { toys } from '../../app_mocks/toys';
import { FilterPam, ToyCard, IRanges } from '../../app_models/interfaces';
import { filterObject } from '../../app_mocks/filter';
import { Filter, Range } from '../../app_models/enum';
import { filter } from 'rxjs-compat/operator/filter';

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
    let filterItems: ToyCard[] = this.toysToFilter;
    for (const [key, value] of Object.entries(this.filterObject)) {

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
      console.log(key)
      console.log(filterItemsByParam)
      console.log(filterItems)
      if (filterItemsByParam.length > 0 && filterItems.length!=0) {
        filterItems = filterItems.concat(filterItemsByParam);
        if (filterItems.length != filterItemsByParam.length)
          filterItems = filterItems.filter((item, pos) => {
            return filterItems.indexOf(item) !== pos;
          });
      }
      console.log(filterItems)
      // if (filterItems.length===0) return filterItems;
    }
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
  filterByRange(rangeObject:IRanges[]){
    let toysToFilterByRange: ToyCard[]=[]
    if (this.checkFilterObject())  toysToFilterByRange = this.filterAll();
    else toysToFilterByRange = toys;
    rangeObject.forEach ((rangeBar:IRanges)=>{
      toysToFilterByRange = toysToFilterByRange.filter((el)=>{
        return Number(el[rangeBar.range as keyof ToyCard])>=rangeBar.value && Number(el[rangeBar.range as keyof ToyCard])<=rangeBar.highValue
      })
    })
     return toysToFilterByRange;
     }

}
