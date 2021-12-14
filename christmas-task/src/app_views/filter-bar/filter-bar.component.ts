import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { shapes, colors, sizes, favorites } from '../../app_mocks/filter';
import {
  IShape,
  ToyCard,
  IColor,
  ISize,
  IFavorite,
  IRanges
} from '../../app_models/interfaces';
import { FilterServiceComponent } from '../../app_services/filter-service/filter-service.component';
import { Filter, Range } from '../../app_models/enum';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() shapes: IShape[];
  @Input() colors: IColor[];
  @Input() sizes: ISize[];
  @Input() favorites: IFavorite[];
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
  constructor(private filter: FilterServiceComponent) {
    this.shapes = shapes;
    this.colors = colors;
    this.sizes = sizes;
    this.favorites = favorites;
  }
  filterByShape(shape: IShape) {
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
    const toys: ToyCard[] = this.filter.filterByRange(rangeObject);
    this.filterThis.emit(toys);
  }
}
