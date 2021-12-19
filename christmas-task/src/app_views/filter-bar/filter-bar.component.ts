import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
import { SortingServiceComponent } from '../../app_services/sorting-service/sorting-service.component';
import { StorageServiceComponent } from '../../app_services/storage-service/storage-service.component';
import { SearchServiceComponent } from '../../app_services/search-service/search-service.component';
import { SortBarComponent } from '../sort-bar/sort-bar.component';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  providers: [
    SortingServiceComponent,
    FilterServiceComponent,
    SearchServiceComponent,
    SortBarComponent,
  ],
})
export class FilterBarComponent implements OnInit {
  @Input() shapes: IShape[] = [];
  @Input() colors: IColor[] = [];
  @Input() sizes: ISize[] = [];
  @Input() favorites: IFavorite[] = [];
  @Output() filterThis = new EventEmitter<ToyCard[]>();
  valueYear: number = 1940;
  highValueYear: number = 2020;
  optionsYear: Options = {
    floor: 1940,
    ceil: 2020,
    step: 1,
  };
  valueQuantity: number = 1;
  highValueQuantity: number = 12;
  optionsQuantity: Options = {
    floor: 1,
    ceil: 12,
    step: 1,
  };

  userInput: string = '';
  constructor(
    private filter: FilterServiceComponent,
    private storageService: StorageServiceComponent,
    private searchService: SearchServiceComponent
  ) {}
  ngOnInit(): void {
    this.getRangesdata();
    this.shapes = this.filter.filterObject.shapeFilter;
    this.colors = this.filter.filterObject.colorFilter;
    this.sizes = this.filter.filterObject.sizeFilter;
    this.favorites = this.filter.filterObject.favoriteFilter;
    const toys: ToyCard[] = this.filter.filterAll();
    this.filterThis.emit(toys);
    this.filterByRanges();
    document.getElementById('search')!.focus();
  }
  returnBackgroundIcon(svgName: string): { background: string } {
    return {
      background: `url(assets/svg/${svgName}.svg) no-repeat center`,
    };
  }
  getRangesdata(): void {
    if (this.storageService.getObject('rangesObject')) {
      this.valueYear = this.storageService.getObject('rangesObject')[0].value;
      this.highValueYear =
        this.storageService.getObject('rangesObject')[0].highValue;
      this.valueQuantity =
        this.storageService.getObject('rangesObject')[1].value;
      this.highValueQuantity =
        this.storageService.getObject('rangesObject')[1].highValue;
    } else {
      this.valueYear = 1940;
      this.highValueYear = 2020;
      this.valueQuantity = 1;
      this.highValueQuantity = 12;
    }
  }
  filterByShape(shape: IShape): void {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.shapeFilter,
      shape
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  filterByColor(color: IColor): void {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.colorFilter,
      color
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  filterBySize(size: ISize): void {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.sizeFilter,
      size
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  filterByFavorite(favorite: IFavorite): void {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.favoriteFilter,
      favorite
    );
    this.filterThis.emit(toys);
    this.filterByRanges();
  }
  getFlag(filterKey: string, filterKeyId: number): boolean {
    return this.filter.getFilterObject()[
      `${filterKey}Filter` as keyof IFilterObject
    ][filterKeyId].isOn;
  }
  deleteInput() {
    this.userInput = '';
    this.searchBy(this.userInput);
  }
  searchBy(input: string): void {
    const toys: ToyCard[] = this.filter.filterAll();
    this.filterThis.emit(toys);
    this.filterByRanges();
    const toysNew: ToyCard[] = this.searchService.search(input);
    this.filterThis.emit(toysNew);
  }
  filterByRanges(): void {
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
    this.filterThis.emit(toys);
  }
  cleanFilters() {
    this.storageService.removeObject('filterObject');
    this.storageService.removeObject('rangesObject');
    this.getRangesdata();
    document
      .querySelectorAll<HTMLInputElement>('.filter-container__checkbox')
      .forEach((el) => {
        if (el.checked) {
          let event = new Event('change');
          el.dispatchEvent(event);
        }
      });
  }
  clearLocalStorage() {
    this.storageService.removeObject('favouritesToys');
    this.storageService.removeObject('sortingOrder');
    this.cleanFilters();
    (<HTMLSelectElement>document.getElementById('sortBar')).value = '-1';
  }
}
