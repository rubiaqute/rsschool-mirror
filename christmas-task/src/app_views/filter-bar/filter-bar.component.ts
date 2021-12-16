import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { shapes, colors, sizes, favorites } from '../../app_mocks/filter';
import {
  IShape,
  ToyCard,
  IColor,
  ISize,
  IFavorite,
  IRanges,
  IFilterObject,
} from '../../app_models/interfaces';
import { FilterServiceComponent } from '../../app_services/filter-service/filter-service.component';
import { Filter, Range } from '../../app_models/enum';
import { Options } from '@angular-slider/ngx-slider';
import { SortingServiceComponent } from 'src/app_services/sorting-service/sorting-service.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  providers: [SortingServiceComponent],
})
export class FilterBarComponent implements OnInit {
  @Input() shapes: IShape[] = [];
  @Input() colors: IColor[] = [];
  @Input() sizes: ISize[] = [];
  @Input() favorites: IFavorite[] = [];
  @Output() filterThis = new EventEmitter<ToyCard[]>();
  valueYear: number = this.storageService.getObject('rangesObject')[0].value;
  highValueYear: number = this.storageService.getObject('rangesObject')[0].highValue;
  optionsYear: Options = {
    floor: 1940,
    ceil: 2020,
    step: 1,
  };
  valueQuantity: number = this.storageService.getObject('rangesObject')[1].value;
  highValueQuantity: number = this.storageService.getObject('rangesObject')[1].highValue;
  optionsQuantity: Options = {
    floor: 1,
    ceil: 12,
    step: 1,
  };
  sortingOrder: string = '0';
  constructor(
    private filter: FilterServiceComponent,
    private sorter: SortingServiceComponent,
    private storageService: StorageServiceComponent
  ) {
    this.sortingOrder = this.sorter.returnSortOrder();
  }
  ngOnInit(): void {
    this.getRangesdata();
    this.shapes = this.filter.filterObject.shapeFilter;
    this.colors = this.filter.filterObject.colorFilter;
    this.sizes = this.filter.filterObject.sizeFilter;
    this.favorites = this.filter.filterObject.favoriteFilter;
    console.log(this.filter.filterObject);
    const toys: ToyCard[] = this.filter.filterAll();
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  getRangesdata(){
    if (this.storageService.getObject('rangesObject')){
    this.valueYear = this.storageService.getObject('rangesObject')[0].value;
    this.highValueYear = this.storageService.getObject('rangesObject')[0].highValue;
    this.valueQuantity = this.storageService.getObject('rangesObject')[1].value;
    this.highValueQuantity = this.storageService.getObject('rangesObject')[1].highValue;
    } else {
      this.valueYear = 1940;
      this.highValueYear = 2020;
      this.valueQuantity = 1;
      this.highValueQuantity = 12;
    }
  }
  filterByShape(shape: IShape) {
    console.log(this.sorter.returnSortOrder());
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.shapeFilter,
      shape
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  filterByColor(color: IColor) {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.colorFilter,
      color
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  filterBySize(size: ISize) {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.sizeFilter,
      size
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  filterByFavorite(favorite: IFavorite) {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.favoriteFilter,
      favorite
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  getFlag(filterKey: string, filterKeyId: number): boolean {
    console.log(
      this.filter.filterObject[`${filterKey}Filter` as keyof IFilterObject][
        filterKeyId
      ].isOn
    );
    return this.filter.filterObject[
      `${filterKey}Filter` as keyof IFilterObject
    ][filterKeyId].isOn;
  }
  filterByRanges() {
    const rangeObject: IRanges[] = [
      {
        range: Range.year,
        value: this.valueYear,
        highValue: this.highValueYear,
      },
      {
        range: Range.count,
        value: this.valueQuantity,
        highValue: this.highValueQuantity,
      },
    ];
    this.storageService.setObject('rangesObject', rangeObject);
    const toys: ToyCard[] = this.filter.filterByRange(rangeObject);
    console.log(this.storageService.getObject('filterObject'));
    this.filterThis.emit(toys);
  }
}
