import { Component, Input, Output, EventEmitter } from '@angular/core';
import { shapes, colors, sizes } from '../../app_mocks/filter';
import { IShape, ToyCard, IColor, ISize } from '../../app_models/interfaces';
import { FilterServiceComponent } from '../../app_services/filter-service/filter-service.component';
import { Filter } from '../../app_models/enum';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() shapes: IShape[];
  @Input() colors: IColor[];
  @Input() sizes: ISize[];
  @Output() filterThis = new EventEmitter<ToyCard[]>();
  constructor(private filter: FilterServiceComponent) {
    this.shapes = shapes;
    this.colors = colors;
    this.sizes = sizes;
  }
  filterByShape(shape: IShape, e: Event) {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.shapeFilter,
      shape
    );
    this.filterThis.emit(toys);
  }
  filterByColor(color: IColor, e: Event) {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.colorFilter,
      color
    );
    this.filterThis.emit(toys);
  }
  filterBySize(size: ISize) {
    const toys: ToyCard[] = this.filter.updateFilterObject(
      Filter.sizeFilter,
      size
    );
    this.filterThis.emit(toys);
  }
}
